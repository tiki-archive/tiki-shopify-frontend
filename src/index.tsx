/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import App from './App'

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container!);
console.log('load');
root.render(<App />);
