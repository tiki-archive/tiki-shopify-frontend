/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React from 'react';
import { DiscountMethod, DiscountStatus, RequirementType, SummaryCard } from "@shopify/discount-app-components"

interface SummaryProps{
    title: string,
    reqType: RequirementType,
    subtotal: number, 
    quantity: number, 
    oncePerCustomer: boolean, 
    totalUsageLimit: number, 
    startDate: Date, 
    endDate: Date
}

export function SummarySection({title, reqType, subtotal, quantity, oncePerCustomer, totalUsageLimit, startDate, endDate}: SummaryProps){
    return (
        <SummaryCard
            header={{
                discountMethod: DiscountMethod.Automatic,
                discountStatus: DiscountStatus.Active,
                discountDescriptor: title,
                appDiscountType: 'TIKI',
                isEditing: true 
            }}
            minimumRequirements={{
                requirementType: reqType,
                subtotal,
                quantity,
            }}
            usageLimits={{
                oncePerCustomer,
                totalUsageLimit
            }}
            activeDates={{
                startDate,
                endDate
            }} 
            performance={{
                isEditing: true
            }}                    
        />
    )
}