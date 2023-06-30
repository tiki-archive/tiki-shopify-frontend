/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { useForm, useField, SubmitResult } from '@shopify/react-form'
import { AppliesTo, DiscountMethod, RequirementType, SummaryCard, } from '@shopify/discount-app-components'
import { Card, Layout, Page, PageActions, TextField } from '@shopify/polaris'

import { DiscountReq } from '../../../interface/discount-req'
import {
    MinReqsCard,
    ActiveDatesCard,
    DiscountAmount,
    CombinationsCard,
    AppliesToChoices,
    TitleAndDescription,
    SummarySection
} from '../../../components'
import { useState } from "react"
import { Redirect } from '@shopify/app-bridge/actions'
import { useAuthenticatedFetch } from '../../../hooks/useAuthenticatedFetch'
import { BaseResource, Resource } from '@shopify/app-bridge/actions/ResourcePicker'

export function DiscountProductCreate() {

    // const app = useAppBridge();
    // const redirect = Redirect.create(app);
    // const authenticatedFetch = useAuthenticatedFetch(app);


    const [fields, setFields] = useState<DiscountReq>({
        "title": "",
        "startsAt": new Date(),
        "endsAt": null,
        "metafields": {
            "type": "product",
            "description": "",
            "discountType": "amount",
            "discountValue": 10,
            "minValue": 0,
            "minQty": 0,
            "onePerUser": true,
            "products": [],
            "collections": []
        },
        "combinesWith": {
            "orderDiscounts": false,
            "productDiscounts": false,
            "shippingDiscounts": false
        }
    })

    const submit = () => console.log(fields);

    return (
        <Page
            title="Create a Product Discount"
            primaryAction={{
                content: 'Save',
                onAction: submit,
            }}
        >
            <Layout>
                <Layout.Section>
                    <form>
                        <Card>
                            <Card.Section title="Title">
                                <TitleAndDescription onChange={(values) => {
                                    fields.title = values.title
                                    fields.metafields.description = values.description
                                    setFields(fields)
                                }} />
                            </Card.Section>
                            <Card.Section title="Value">
                                <DiscountAmount
                                    onChange={({ type, value }) => {
                                        if (type !== undefined) {
                                            fields.metafields.discountType = type
                                        }
                                        if (value !== undefined) {
                                            fields.metafields.discountValue = value
                                        }
                                        setFields(fields)
                                    }}
                                />
                            </Card.Section>
                            <Card.Section title="Applies To">
                                <AppliesToChoices onChange={(list: Resource[], resource: 'all' | 'products' | 'collections') => {
                                     switch (resource) {
                                        case 'all':
                                            fields.metafields.products = []
                                            fields.metafields.collections = []
                                            break
                                        case 'products':
                                            fields.metafields.products = list.map((p) => p.id)
                                            fields.metafields.collections = []
                                            break
                                        case 'collections':
                                            fields.metafields.collections = list.map((p) => p.id)
                                            fields.metafields.products = []
                                            break
                                    }
                                    setFields(fields)
                                }}
                                />
                            </Card.Section>
                        </Card>
                        <MinReqsCard
                            appliesTo={AppliesTo.Products}
                            type={RequirementType.None}
                            subTotal={fields.metafields.minValue}
                            qty={fields.metafields.minQty}
                            onChange={({ type, value, qty }) => {
                                switch (type) {
                                    case RequirementType.Quantity:
                                        fields.metafields.minQty = qty
                                        fields.metafields.minValue = 0
                                        break;
                                    case RequirementType.Subtotal:
                                        fields.metafields.minValue = value
                                        fields.metafields.minQty = 0
                                        break;
                                    case RequirementType.None:
                                        fields.metafields.minValue = 0
                                        fields.metafields.minQty = 0
                                        break;
                                }
                                setFields(fields)
                            }}
                        />
                        <CombinationsCard onChange={(combinations) => {
                            fields.combinesWith.orderDiscounts = combinations.orderDiscounts
                            fields.combinesWith.productDiscounts = combinations.productDiscounts
                            fields.combinesWith.shippingDiscounts = combinations.shippingDiscounts
                            setFields(fields)
                        }} />
                        <ActiveDatesCard
                            onChange={(s: string, e: string) => {
                                fields.startsAt = new Date(s)
                                fields.endsAt = e ? new Date(e) : null
                                setFields(fields)
                            }}
                            startsAt={fields.startsAt.toUTCString()}
                            endsAt={fields.endsAt ? fields.endsAt.toUTCString() : ''} />
                    </form>
                </Layout.Section>
                <Layout.Section secondary>
                        <Card>
                            <Card.Section title="Title">
                                <p>Title: {fields.title}</p>
                                <p>Description: {fields.metafields.description}</p>
                            </Card.Section>
                            <Card.Section title="Value">
                                <p>Discount Type: {fields.metafields.discountType}</p>
                                <p>Discount Value: {fields.metafields.discountType === 'amount' ? '$':''} {fields.metafields.discountValue}{fields.metafields.discountType === 'percentage' ? '%':''}</p>
                            </Card.Section>
                            <Card.Section title="Minimum Requirements">
                                <p>{fields.metafields.minValue ? `Minimum value:${fields.metafields.minValue}` : ''}</p>
                                <p>{fields.metafields.minQty ? `Minimum quantity:${fields.metafields.minQty}` : ''}</p>
                            </Card.Section>
                        </Card>
                        <Card>
                            <Card.Section title="Combines with">
                                <p>Order Discounts: {fields.combinesWith.orderDiscounts ? 'Yes': 'No'}</p>
                                <p>Product Discounts: {fields.combinesWith.productDiscounts ? 'Yes': 'No'}</p>
                                <p>Shipping Discounts: {fields.combinesWith.shippingDiscounts ? 'Yes': 'No'}</p>
                            </Card.Section>
                            <Card.Section title="Active dates">
                                <p>Starts at: {fields.startsAt.toLocaleTimeString()}</p>
                                <p>{fields.endsAt ? `Ends at: ${fields.endsAt!.toLocaleDateString()}`: ''}</p>
                            </Card.Section>
                        </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

