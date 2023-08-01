/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import {
    Page,
    Layout,
    Card,
    Heading,
    Link,
    Stack,
    TextContainer,
    LegacyCard,
    TextField,
    Checkbox,
    VerticalStack,
    Select,
  } from '@shopify/polaris'
import { Editor } from '@tinymce/tinymce-react'
import * as template from "./terms.html";
import { useCallback, useRef, useState } from 'react';
  
export function TermsEdit () {
  const template = `
    Company: %%%COMPANY%%%
    City, State and Country: %%%JURISDICTION%%%
    Terms of service: %%%TOS_URL%%%
    Privacy Policy: %%%PRIVACY_POLICY_URL%%%
  `;
  const [allowDirectEdit, setAllowDirectEdit] = useState(false);
  const [terms, setTerms] = useState<string>(template);
  const [legalName, setLegalName] = useState('');
  const [address, setAddress] = useState('');
  const [tos, setTos] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [useCases, setUseCases] = useState([
    '{ text: \"Use Case 1\", isUsed: true }',
    '{ text: \"Use Case 2\", isUsed: true }',
    '{ text: \"Use Case 3\", isUsed: false }'
  ]);
  const handleDiscountSelection = useCallback(
    (value: string) => {
      setSelectedDiscount(value)
    },
    [selectedDiscount]
  );
  const handleDirectEditPermission = useCallback(
    (value: boolean) => {
      setAllowDirectEdit(value)
    },
    [allowDirectEdit]
  );
  const handleTermsUpdate = useCallback(
    (value: string) => {
      setTerms(value)
    },
    [terms]
  )
  const useCaseOptions = [
    {label: '&check; Use Case 1', value: '{ text: \"Use Case 1\", isUsed: true }'},
    {label: '&#x78; Use Case 1', value: '{ text: \"Use Case 1\", isUsed: false }'},
    {label: '&check; Use Case 2', value: '{ text: \"Use Case 2\", isUsed: true }'},
    {label: '&#x78; Use Case 2', value: '{ text: \"Use Case 2\", isUsed: false }'},
    {label: '&check; Use Case 3', value: '{ text: \"Use Case 3\", isUsed: true }'},
    {label: '&#x78; Use Case 3', value: '{ text: \"Use Case 3\", isUsed: false }'},
    {label: '&check; Use Case 4', value: '{ text: \"Use Case 4\", isUsed: true }'},
    {label: '&#x78; Use Case 4', value: '{ text: \"Use Case 4\", isUsed: false }'},
    {label: '&check; Use Case 5', value: '{ text: \"Use Case 5\", isUsed: true }'},
    {label: '&#x78; Use Case 5', value: '{ text: \"Use Case 5\", isUsed: false }'},
    {label: '&check; Use Case 6', value: '{ text: \"Use Case 6\", isUsed: true }'},
    {label: '&#x78; Use Case 6', value: '{ text: \"Use Case 6\", isUsed: false }'},
    {label: '&check; Use Case 7', value: '{ text: \"Use Case 7\", isUsed: true }'},
    {label: '&#x78; Use Case 7', value: '{ text: \"Use Case 7\", isUsed: false }'},
    {label: '&check; Use Case 8', value: '{ text: \"Use Case 8\", isUsed: true }'},
    {label: '&#x78; Use Case 8', value: '{ text: \"Use Case 8\", isUsed: false }'},
    {label: '&check; Use Case 9', value: '{ text: \"Use Case 9\", isUsed: true }'},
    {label: '&#x78; Use Case 9', value: '{ text: \"Use Case 9\", isUsed: false }'},
    {label: '&check; Use Case 10', value: '{ text: \"Use Case 10\", isUsed: true }'},
    {label: '&#x78; Use Case 10', value: '{ text: \"Use Case 10\", isUsed: false }'},
  ];
  const discountOptions = [
    {label: '10% off summer sale', value: 'discount1'},
    {label: '$10 coupoun', value: 'discont2'},
    {label: '5% off', value: 'discount3'},
  ];
  const replaceInTerms = (placeholder:string, value:string) => {
    const newTerms = template.replaceAll(placeholder, value);
    handleTermsUpdate(newTerms)
  }
  const updateLegalName = (value: string) => {
    setLegalName(value)
    replaceInTerms('%%%COMPANY%%%', value)
  }
  const updateAddress = (value: string) => {
    setAddress(value)
    replaceInTerms('%%%JURISDICTION%%%', value)
  }
  const updateTos = (value: string) => {
    setTos(value)
    replaceInTerms('%%%TOS_URL%%%', value)
  }
  const updatePrivacyPolicy = (value: string) => {
    setPrivacyPolicy(value)
    replaceInTerms('%%%PRIVACY_POLICY_URL%%%', value)
  }
  const handleUseCaseSelection = (value: string, index: number): void => {
    let newUseCases = [...useCases];
    newUseCases[index] = value
    setUseCases(newUseCases);
  }
  const getUseCaseValue = (index: number): string => {
    return useCases[index];
  }

  return (
    <Page fullWidth>
    <Layout>
      <Layout.Section>
        <LegacyCard title="Terms" sectioned>
        <LegacyCard.Section>
          <p>
            Placeholder text. In this section we explain about the terms and how to edit it.<br />
            The user must provide its legal information to fill the spaces in the terms text.<br />
            The text can be edited too, if the user wants to provide its own legal terms.<br />
          </p>
          </LegacyCard.Section>
          <LegacyCard.Section>
          <VerticalStack gap="5">
            <TextField
              label="Company"
              type="text"
              value={legalName}
              onChange={updateLegalName}
              helpText="This is the Comapany's legal name."
              autoComplete="email"
            />
            <TextField
              label="City, State and Country"
              type="text"
              value={address}
              onChange={updateAddress}
              helpText="This is the Company's legal Address City, State and Country."
              autoComplete="email"
            />
            <TextField
              label="Terms of service"
              type="url"
              value={tos}
              onChange={updateTos}
              helpText="The URL of your Terms of Service"
              autoComplete=""
            />
            <TextField
              label="Privacy Policy"
              type="url"
              value={privacyPolicy}
              onChange={updatePrivacyPolicy}
              helpText="The Privacy Policy URL"
              autoComplete=""
            />
          </VerticalStack>
          </LegacyCard.Section>
          <LegacyCard.Section>
            { ( ! allowDirectEdit) ? (
            <>
            <p>These are the default terms filled with the legal information provided above. 
              It is a read-only field, but you can enable the edit. Just edit the terms with legal
              assistance.
            </p>
              <p>{terms}</p>
              <Checkbox
                label="I want to edit the terms. I understand the risk."
                checked={allowDirectEdit}
                onChange={handleDirectEditPermission}
              />
              </>
            ) : (
              <>
              <p>WARNING: THIS IS A LEGAL CONTRACT. EDIT WITH LEGAL ADVISORY.</p>
              <p> 
                Available placeholders. Will be replaced by the values edited above.
                <ul>
                  <li>Company: %%%COMPANY%%%</li>
                  <li>City, State and Country: %%%JURISDICTION%%%</li>
                  <li>Terms of service: %%%TOS_URL%%%</li>
                  <li>Privacy Policy: %%%PRIVACY_POLICY_URL%%%</li>
                </ul>
              </p>
              <TextField
                label="Terms editor"
                value={terms}
                onChange={handleTermsUpdate}
                multiline={4}
                autoComplete="off"
              />
              </>
            )
          } 
          </LegacyCard.Section>
        </LegacyCard>
      </Layout.Section>
      <Layout.Section secondary>
      <LegacyCard title="Discount" sectioned>
          <p>Choose which discount should be used in the offer.</p>
          <Select
            label="Discount"
            options={discountOptions}
            onChange={handleDiscountSelection}
            value={selectedDiscount}
          />
        </LegacyCard>
        <LegacyCard title="Use cases" sectioned>
          <p>Use cases describe how the user data will be used or not used.</p> 
          <VerticalStack gap="5">
          <Select
            label="First use case"
            options={useCaseOptions}
            onChange={(value) => handleUseCaseSelection(value, 1)}
            value={getUseCaseValue(1)}
          />
          <Select
            label="First use case"
            options={useCaseOptions}
            onChange={(value) => handleUseCaseSelection(value, 2)}
            value={getUseCaseValue(2)}
          />
          <Select
            label="First use case"
            options={useCaseOptions}
            onChange={(value) => handleUseCaseSelection(value, 3)}
            value={getUseCaseValue(3)}
          />
          </VerticalStack>
        </LegacyCard>
      </Layout.Section>
    </Layout>
  </Page>
  )
}
  