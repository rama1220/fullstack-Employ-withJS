export default function DashoardMenu() {
  const name = localStorage.getItem("user");

  return (
    <div>
      <h2>Wellcome {name}</h2>
    </div>
  );
}
