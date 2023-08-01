/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React from 'react';
import { Routes, Route } from "react-router-dom";
import { HomePage, DiscountOrderCreate, DiscountOrderDetail, DiscountProductCreate, DiscountProductDetail } from "../pages";
import { TermsEdit } from '../pages/terms';

export function AppRouter() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/terms" element={<TermsEdit />} />
            <Route path="/discount/product" element={<DiscountProductCreate />} />
            <Route path="/discount/product/:id" element={<DiscountProductDetail />} />
            <Route path="/discount/order" element={<DiscountOrderCreate />} />
            <Route path="/discount/order/:id" element={<DiscountOrderDetail />} />
        </Routes>
    )
}