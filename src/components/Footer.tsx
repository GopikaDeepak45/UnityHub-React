const Footer = () => {
  return (
    <div
      id="footer"
      className=" py-10"
      style={{ backgroundColor: "rgba(148, 192, 147, 0.5)" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span
          className="text-3xl  font-bold tracking-tight"
          style={{ color: "#205418" }}
        >
          UnityHub
        </span>
        <span className="text-black font-bold tracking-tight flex gap-4 ">
          <span>© 2024 UnityHub. All Rights Reserved.</span>
          {/* <span>HHHHH</span> */}
        </span>
      </div>
    </div>
  );
};

export default Footer;
