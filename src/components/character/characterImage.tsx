const CharacterImage = ({ id }: { id: string }) => {
  return (
    <div id={id} className=" w-full h-full flex flex-col items-center">
      <Head />
      <Body>
        <Arm />
      </Body>
    </div>
  );
};

const Head = () => {
  return <div className="relative w-20 h-20 bg-red-500 rounded-full z-10 "></div>;
};
const Body = ({ children }: any) => {
  return <div className="w-16 h-32 relative bg-blue-500 flex justify-center">{children}</div>;
};

const Arm = () => {
  return <div className="w-10 h-28 bg-green-500 z-10 top-4 right-0 order-1  -rotate-[35deg] "></div>;
};

export default CharacterImage;
