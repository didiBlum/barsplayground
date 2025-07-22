function MissionSelector({ missions, onSelect }) {
  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">בחר משימה</h1>
      <div className="grid gap-4">
        {missions.map((mission) => (
          <button
            key={mission.id}
            onClick={() => onSelect(mission)}
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded shadow"
          >
            {mission.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MissionSelector;
