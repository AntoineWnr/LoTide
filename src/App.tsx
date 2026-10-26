import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CampPage } from '@/pages/CampPage';
import { SurfPage } from '@/pages/SurfPage';
import { FaqPage } from '@/pages/FaqPage';
import { ContactPage } from '@/pages/ContactPage';
import { LegalPage, NotFoundPage } from '@/pages/LegalPage';
import { QuizPage } from '@/pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quiz" element={<QuizPage />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lombok" element={<CampPage key="lombok" campId="lombok" />} />
          <Route path="bali" element={<CampPage key="bali" campId="bali" />} />
          <Route path="surf" element={<SurfPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<LegalPage kind="privacy" />} />
          <Route path="terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
