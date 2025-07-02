export default function WelcomeBanner() {
  return (
    <div className="bg-foreground border-l-4 border-primary text-text-primary p-4 mb-6 rounded-r-lg">
      <strong>Welcome to VibeCoders!</strong>
      {' '}
      Join our community on <a href="https://discord.gg/yourlink" className="underline font-bold hover:text-primary transition-colors" target="_blank">Discord</a>
      {' '}
      to meet other LLM-first builders!
    </div>
  );
}
