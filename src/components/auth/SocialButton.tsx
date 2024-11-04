import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { Provider } from '@supabase/auth-js';

type SocialButtonProps = {
  provider: Provider;
  children: ReactNode;
};
const SocialButton: FC<SocialButtonProps> = ({ provider, children }) => {
  const providersBg: Record<string, string> = {
    google: 'red-500',
  };

  const handleLogin = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      console.error('Error al iniciar sesión con proveedor:', error.message);
      return;
    }

    if (data?.url) {
      return redirect(data.url);
    }
  };

  return (
    <button
      type="button"
      className={`text-center w-full py-3 px-4 text-white rounded-lg font-semibold bg-${providersBg[provider]} hover:opacity-90`}
      onClick={() => handleLogin(provider)}
    >
      {children}
    </button>
  );
};

export default SocialButton;
