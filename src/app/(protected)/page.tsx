import ToastedButton from "@/components/toasted-button";


export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>Index</h1>
      <ToastedButton name="test-btn" title="test toast" description="testing toast" className="bg-destructive">Test</ToastedButton>
    </div>
  );
}
