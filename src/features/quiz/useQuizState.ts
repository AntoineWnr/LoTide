import { useCallback, useEffect, useState } from 'react';
import { loadJSON, removeKey, saveJSON } from '@/lib/storage';
import { QUIZ_STEPS, type CompleteAnswers, type QuizAnswers } from './types';

const STORAGE_KEY = 'lotide.quiz.v1';
export const LOADING_STEP = QUIZ_STEPS.length;
export const RESULT_STEP = QUIZ_STEPS.length + 1;

interface Saved {
  answers: QuizAnswers;
  step: number;
}

function isComplete(a: QuizAnswers): a is CompleteAnswers {
  return QUIZ_STEPS.every((k) => a[k] !== undefined);
}

function initial(): Saved {
  const saved = loadJSON<Saved>(STORAGE_KEY);
  if (!saved || typeof saved.step !== 'number' || typeof saved.answers !== 'object' || !saved.answers) {
    return { answers: {}, step: 0 };
  }
  if (saved.step >= LOADING_STEP) {
    return isComplete(saved.answers) ? { answers: saved.answers, step: RESULT_STEP } : { answers: saved.answers, step: 0 };
  }
  return { answers: saved.answers, step: Math.max(0, Math.min(saved.step, QUIZ_STEPS.length - 1)) };
}

export function useQuizState() {
  const [state, setState] = useState<Saved>(initial);
  const [direction, setDirection] = useState(1);
  const [resumed] = useState(() => state.step > 0 || Object.keys(state.answers).length > 0);

  useEffect(() => saveJSON(STORAGE_KEY, state), [state]);

  const answer = useCallback(<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setDirection(1);
    setState((s) => ({ answers: { ...s.answers, [key]: value }, step: s.step + 1 }));
  }, []);

  const setAnswer = useCallback(<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [key]: value } }));
  }, []);

  const back = useCallback(() => {
    setDirection(-1);
    setState((s) => ({ ...s, step: Math.max(0, Math.min(s.step, QUIZ_STEPS.length) - 1) }));
  }, []);

  const showResult = useCallback(() => setState((s) => ({ ...s, step: RESULT_STEP })), []);

  const restart = useCallback(() => {
    removeKey(STORAGE_KEY);
    setDirection(-1);
    setState({ answers: {}, step: 0 });
  }, []);

  return {
    answers: state.answers,
    complete: isComplete(state.answers) ? state.answers : null,
    step: state.step,
    direction,
    resumed,
    answer,
    setAnswer,
    back,
    showResult,
    restart,
  };
}
