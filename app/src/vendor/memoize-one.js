function isEqual(first, second) {
  if (first === second) {
    return true;
  }

  return Number.isNaN(first) && Number.isNaN(second);
}

function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (let i = 0; i < newInputs.length; i += 1) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }

  return true;
}

export default function memoizeOne(resultFn, equalityFn = areInputsEqual) {
  let cache = null;

  function memoized(...newArgs) {
    if (
      cache &&
      cache.lastThis === this &&
      equalityFn(newArgs, cache.lastArgs)
    ) {
      return cache.lastResult;
    }

    const lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastArgs: newArgs,
      lastResult,
      lastThis: this,
    };

    return lastResult;
  }

  memoized.clear = () => {
    cache = null;
  };

  return memoized;
}
