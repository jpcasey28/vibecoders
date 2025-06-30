export default function WelcomeBanner() {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 mb-4">
      <strong>Welcome to VibeCoders!</strong>
      {' '}
      Join our community on <a href="https://discord.gg/yourlink" className="underline font-bold" target="_blank">Discord</a>
      {' '}to meet other LLM-first builders!
    </div>
  );
}
