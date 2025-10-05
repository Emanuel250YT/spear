'use client';

import { useWeb3Context } from '@/contexts/Web3Context';

export const useWeb3 = () => {
  return useWeb3Context();
};
