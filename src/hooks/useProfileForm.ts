import { useCallback, useEffect, useState } from 'react';

export default function useProfileForm(
  initial = { name: '', phone: '', address: '' }
) {
  const [fields, set] = useState(initial);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    set(initial);
    setDirty(false);
  }, [initial]);
  const update = useCallback(
    <K extends keyof typeof fields>(k: K, v: (typeof fields)[K]) => {
      set(f => ({ ...f, [k]: v }));
      setDirty(true);
    },
    []
  );

  return { fields, update, dirty, resetDirty: () => setDirty(false) };
}
