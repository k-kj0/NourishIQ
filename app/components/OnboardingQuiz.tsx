// In the WeightStep component, replace with this:
const WeightStep = () => {
  const { quizState, updateQuizState, goNext } = useApp();
  const wantsWeightLoss = quizState.healthGoals.includes("lose-weight");

  if (!wantsWeightLoss) {
    setTimeout(goNext, 100);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Scale size={40} className="text-green-500 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your weight journey
        </h2>
        <p className="text-sm text-gray-500">
          We will personalize your plan for healthy, sustainable results
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Current weight ({quizState.weightUnit})
          </label>
          <input
            type="number"
            value={quizState.currentWeight || ""}
            onChange={(e) =>
              updateQuizState({ currentWeight: parseInt(e.target.value) || null })
            }
            placeholder="0"
            className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Target weight ({quizState.weightUnit}) — optional
          </label>
          <input
            type="number"
            value={quizState.targetWeight || ""}
            onChange={(e) =>
              updateQuizState({ targetWeight: parseInt(e.target.value) || null })
            }
            placeholder="0"
            className="w-full text-2xl font-black p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
};
