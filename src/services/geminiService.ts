export async function generateInvestmentStrategy(topic: string) {
  try {
    const response = await fetch("/api/strategy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate strategy");
    }

    return await response.json();
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
}
