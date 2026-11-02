export function Bad() {
  return (
    <div className="bg-[#111111] p-[13px] w-[390px] text-white bg-red-500 p-3.5 min-h-screen hover:bg-action-primary">
      <span className="data-[state=open]:bg-surface-glass [&_svg]:size-4 text-[17px] rounded-[15px]">&#8212; Bad</span>
      <p style={{ color: "rgba(0,0,0,.5)", padding: "13px", height: "100vh" }}>x</p>
    </div>
  );
}
