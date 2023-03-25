import axios from "axios";

export default function Home() {
  const fc = async () => {
    try {
      const response = await axios.post("/api/hello");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => fc()}>Click me</button>
    </>
  );
}
