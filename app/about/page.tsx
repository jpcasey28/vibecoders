export default function About() {
  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to VibeCoders</h1>
      <p>
        VibeCoders is a community for LLM-native, self-taught, and creative devs who build with prompts, code, and theory.  
        Join the movement, learn with others, and help define the future of coding!
      </p>
      <div className="mt-4">
        <a
          href="https://discord.gg/yourlink"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our Discord
        </a>
      </div>
    </div>
  );
}
