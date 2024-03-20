import { useScreenStore } from "@/stores/useScreenStore";

const ResultsScreen = ({ result, experience }: { result: string | null; experience: number }) => {
  const setScreen = useScreenStore((state: any) => state?.setScreen);
  return (
    <div id="results-screen" className="absolute w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 text-white p-10 rounded-md flex flex-col justify-center items-center gap-5 transition-all duration-500">
        <div>
          <h1>{result}</h1>
          <p>You have earned {experience} experience points</p>
        </div>
        <button onClick={() => setScreen("menu")}>Return to menu</button>
      </div>
    </div>
  );
};

export default ResultsScreen;
