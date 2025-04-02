from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

app = FastAPI()  # ✅ Define the FastAPI instance

# ✅ Load Model
MODEL_NAME = "mistralai/Mistral-7B-v0.1"
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float16, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# ✅ Define request model
class ChatRequest(BaseModel):
    message: str

@app.post("/feed")
async def chat(input_text: ChatRequest):
    user_message = input_text.message
    if not user_message:
        return {"error": "Empty message"}

    # ✅ Tokenize input
    inputs = tokenizer(user_message, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_length=200)

    # ✅ Decode response
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return {"reply": response}



