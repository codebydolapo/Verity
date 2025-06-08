// src/store/Provider.tsx
"use client";

import { Provider } from 'react-redux';
import { store } from './index'; // Adjust path if needed
import React from 'react';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}