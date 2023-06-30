/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import React, { useMemo, useState } from 'react'
import { To, useLocation, useNavigate } from 'react-router-dom'
import { Provider } from '@shopify/app-bridge-react'
import { Banner, Layout, Page } from '@shopify/polaris'
import { AppConfigV2 } from '@shopify/app-bridge'

// eslint-disable-next-line react/prop-types
export function AppBridgeProvider(props: { children: React.ReactNode }) {
    const location = useLocation()
    const navigate = useNavigate()
    const history = useMemo(
        () => ({
            replace: (path: To) => {
                navigate(path, { replace: true })
            }
        }),
        [navigate]
    )

    const routerConfig = useMemo(
        () => ({ history, location }),
        [history, location]
    )

    const apiKey = "33d82ccecd1a316a4cbdb7d090735fa8"; // process.env.SHOPIFY_API_KEY

    const [appBridgeConfig] = useState(() => {
        const host = new URLSearchParams(location.search).get('host')

        return {
            host,
            apiKey,
            forceRedirect: true
        } as AppConfigV2
    })

    if (!appBridgeConfig.host) {
        const bannerProps = {
            title: 'Missing host query argument',
            children: (
                <>
                    Your app can only load if the URL has a <b>host</b> argument.
                    Please ensure that it is set, or access your app using the
                    Partners Dashboard <b>Test your app</b> feature
                </>
            )
        }

        return (
            <Page narrowWidth>
                <Layout>
                    <Layout.Section>
                        <div style={{ marginTop: '100px' }}>
                            <Banner {...bannerProps} status="critical" />
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        )
    }

    return (
        <Provider config={appBridgeConfig} router={routerConfig}>
            {props.children}
        </Provider>
    )
}
