// https://telegram.org is fine in comments
export function Good() {
  return (
    <div className="min-h-app bg-surface-app px-gutter pt-safe-top p-2.5 gap-1.5">
      {/* #fff in comment */}
      <a href="#section" className="data-[state=open]:bg-surface-glass [&_svg]:size-4 h-button rounded-card border border-line-default text-fg-primary text-14 backdrop-blur-glass-md">
        &#8212; Good
      </a>
      <i className="bg-transparent text-current" style={{ borderWidth: "1px", margin: "var(--space-md)" }} />
      <b className="w-[10px]"> {/* lint-ignore: rive canvas */} </b>
    </div>
  );
}
