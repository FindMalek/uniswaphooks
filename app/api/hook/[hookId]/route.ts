export async function POST(req: Request) {
  return new Response(
    JSON.stringify({
      message: "Hook created successfully",
      data: {},
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
