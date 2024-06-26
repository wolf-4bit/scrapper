abstract class ContextAware {
    protected context: BrowserContext | null = null;
  
    setContext(context: BrowserContext): void {
      this.context = context;
    }
  
    protected ensureContext(): void {
      if (!this.context) {
        throw new Error('Context is not set');
      }
    }
  }


export { ContextAware };