export default function UserScreen() {
  return (
    <div className="flex justify-center items-center">
      <p className="text-3xl" onClick={() => alert("this is user screen")}>
        user screen
      </p>
    </div>
  );
}
