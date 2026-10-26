import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { copy } from '@/i18n';
import { Logo } from '@/components/ui/Logo';
import { Seo } from '@/components/Seo';
import { track } from '@/lib/analytics';
import { ChoiceStep } from '@/features/quiz/ChoiceStep';
import { DatesStep } from '@/features/quiz/DatesStep';
import { LoadingScreen } from '@/features/quiz/LoadingScreen';
import { ResultView } from '@/features/quiz/ResultView';
import { LOADING_STEP, RESULT_STEP, useQuizState } from '@/features/quiz/useQuizState';
import { levelOptions, locationOptions, roomOptions, stayOptions, travelOptions } from '@/features/quiz/options';
import { QUIZ_STEPS, type QuizAnswers } from '@/features/quiz/types';

const TOTAL = QUIZ_STEPS.length;

const variants = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

export function QuizPage() {
  const t = copy.quiz;
  const quiz = useQuizState();
  const { answers, step, direction } = quiz;
  const navigate = useNavigate();
  const location = useLocation();
  const headingRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const source = (location.state as { source?: string } | null)?.source ?? 'direct';
    track('quiz_started', { source, resumed: quiz.resumed });
  }, [location.state, quiz.resumed]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      const target = e.target as HTMLElement;
      if (e.key === 'Backspace' && step > 0 && step < LOADING_STEP && target.tagName !== 'INPUT') quiz.back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const close = () => (location.key !== 'default' ? navigate(-1) : navigate('/'));

  const handle = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    track(`quiz_step_${QUIZ_STEPS.indexOf(key) + 1}`, { [key]: typeof value === 'object' ? 'dates' : String(value) });
    if (key === 'location' && value === 'lombok' && answers.room === 'female') quiz.setAnswer('room', undefined);
    quiz.answer(key, value);
  };

  const renderStep = () => {
    switch (QUIZ_STEPS[step]) {
      case 'location':
        return <ChoiceStep question={t.location.question} options={locationOptions} value={answers.location} onChoose={(v) => handle('location', v)} />;
      case 'level':
        return <ChoiceStep question={t.level.question} options={levelOptions} value={answers.level} onChoose={(v) => handle('level', v)} />;
      case 'stay':
        return <ChoiceStep question={t.stay.question} options={stayOptions} value={answers.stay} onChoose={(v) => handle('stay', v)} />;
      case 'dates':
        return <DatesStep value={answers.dates} stay={answers.stay} onDone={(v) => handle('dates', v)} />;
      case 'travel':
        return <ChoiceStep question={t.travel.question} options={travelOptions} value={answers.travel} onChoose={(v) => handle('travel', v)} />;
      case 'room':
        return <ChoiceStep question={t.room.question} options={roomOptions(answers)} value={answers.room} onChoose={(v) => handle('room', v)} />;
    }
  };

  const isQuestion = step < LOADING_STEP;
  const isResult = step === RESULT_STEP && quiz.complete;
  const progress = isQuestion ? (step + 1) / TOTAL : 1;

  return (
    <div className="min-h-screen bg-shell">
      <Seo title={copy.pages.quiz.seo.title} description={copy.pages.quiz.seo.description} />
      <header className="sticky top-0 z-30 border-b border-navy-50 bg-shell/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
          {isQuestion && step > 0 ? (
            <button
              type="button"
              onClick={quiz.back}
              aria-label={t.back}
              className="grid h-11 w-11 place-items-center rounded-full text-navy-800 transition hover:bg-sand-100"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : (
            <Link to="/" aria-label={copy.common.nav.home} className="rounded-full">
              <Logo className="scale-90" />
            </Link>
          )}
          <div className="flex-1">
            {isQuestion && (
              <>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-navy-500">
                  <span>{t.title}</span>
                  <span>{t.stepOf(step + 1, TOTAL)}</span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-navy-50"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={TOTAL}
                  aria-valuenow={step + 1}
                  aria-label={t.stepOf(step + 1, TOTAL)}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-ocean-400"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="grid h-11 w-11 place-items-center rounded-full text-navy-800 transition hover:bg-sand-100"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        ref={headingRef}
        tabIndex={-1}
        className={`mx-auto px-4 pt-8 outline-none sm:px-6 sm:pt-12 ${isResult ? 'max-w-5xl' : 'max-w-xl'}`}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pb-12"
          >
            {isQuestion && renderStep()}
            {step === LOADING_STEP && <LoadingScreen onDone={quiz.showResult} />}
            {isResult && quiz.complete && <ResultView answers={quiz.complete} onRestart={quiz.restart} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
