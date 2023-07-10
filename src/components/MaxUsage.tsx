/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { UsageLimitsCard } from "@shopify/discount-app-components";
import { Checkbox } from "@shopify/polaris";
import { useCallback } from "react";
import { useState } from "react";

export const MaxUsageCheckbox = ({onChange = console.log}) => {
    const [oncePerCustomer, setOncePerCustomer] = useState<boolean>(false);
  
    const oncePerCustomerUpdate = useCallback(
        (value: boolean) => {
            setOncePerCustomer(value)
            onChange({oncePerCustomer: value})
        },
        [oncePerCustomer]
    )

    return (
      <Checkbox
            value='oncePerCustomer'
            onChange={oncePerCustomerUpdate} 
            label='Limit to one use per customer'
      />
    )};