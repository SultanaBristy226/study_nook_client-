import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `StudyNook – ${title}` : 'StudyNook';
    return () => { document.title = 'StudyNook'; };
  }, [title]);
}
