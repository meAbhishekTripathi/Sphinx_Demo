*******************
Integration Options
*******************

There are multiple integration options available for Bankograph Payment Gateway.

.. Important::
   - The integration via **Payment Page** is described under `Payment Page`_.

   -  For (near) real-time processing the backend implementation is described under `REST API`_.
      However, the description of payment methods, for example, is common for both Payment Page and         REST API.

   -  Processing of multiple transactions using batches is described under Batch Processing API, available for both SEPA Direct Debit and SEPA Credit Transfer.

   - Our Payment SDK offers a seamless user experience by rendering a payment form as an integral part of the merchant’s mobile application.


Payment Page
====================

Bankograph Payment Page stands for secure, flexible, easy and transparent payment processing.

It provides all payment methods and related options in one solution: Credit Card (with/without 3D secure), SEPA, online banking payments, mobile payments, alternative payment methods, and industry-specific solutions.

It handles the payment method selection as well as the collection of payment details or consumer redirects to alternative payment provider sites. With this solution, the merchant is only required to conform to a limited PCI scope (self-questionnaire A).

Bankograph Payment Page is available in three formats:

.. Hint::

  - Hosted Payment Page (HPP): The consumer is redirected to Bankograph Payment Gateway to finish the checkout process.

  - Embedded Payment Page (EPP): The payment screen is displayed in overlay directly on the merchant’s checkout page.

  - Seamless integration: The merchant’s checkout page is incorporated into Bankograph’s payment form. This solution provides a seamless shopping experience for web-shoppers.

.. Important:: Only HTML knowledge is required for Bankograph Payment Page integration.


REST API
====================

When merchants want full control over the checkout and payment process they can create requests themselves and send them directly to the REST API. All communications between a merchant and the REST API are secured by TLS encryption (HTTPS).

Integration is possible by:

.. Hint::

   - XML requests sent from merchant’s backend (server-to-server)

   - JSON respectively

   - NVP (for credit card only)

.. Important::For the integration of Bankograph Payment Gateway via REST API, advanced programming skills are required.
PCI certified merchants can use Bankograph Payment Gateway without any restrictions.

Non PCI certified merchants can use Bankograph Payment Gateway only with referenced or recurring transactions. For initial transactions they must use a front end solution (e.g. HPP).

Details to integrate Bankograph Payment Gateway via REST API are described here.

Batch Processing API
====================
In order to process multiple transactions at the same time, Bankograph’s Batch Processing is the ideal solution for both fast and easy to implement offline bulk transaction processing.

Batch processing is possible for the following payment methods:

.. Hint::
  - SEPA Direct Debit

  - SEPA Credit Transfer

  - Credit Card

.. Important::Working programming knowledge is required to integrate this way.

SDK
===
The Software Development Kit (SDK) serves as a wrapper for the Bankograph Payment Gateway with a PCI V3 compliant native mobile payment form. SDK is naturally developed for the integration into a merchant’s app as a software library where it covers sending payment requests to the Bankograph Payment Gateway. It uses REST requests constructed by the merchant sent over HTTPS protocol to Bankograph Payment Gateway end-point where the REST API is exposed.

The following payment methods are currently supported:

.. Hint::
 - Credit Card

 - PayPal

 - SEPA Direct Debit

 - Apple Pay

 - Google Pay™

Operation system interfaces:

::

 - iOS

 - Android

.. Important:: Working programmer knowledge is required to integrate this way.


*******************
Integration Guides
*******************

Bankograph Payment Page v2
==========================

HPP Integration Guide
---------------------

Overview
^^^^^^^^
To integrate the Hosted Payment Page (HPP) in your shop, use a simple backend-to-backend JSON WPP v2 Workflow for the payment process.

1. **Create a payment session:** You send an initial POST request with details of the transaction to the Bankograph Payment Page v2 (WPP v2). This POST request is secured by basic access authentication.

2. **Redirect the consumer to the payment page:** WPP v2 returns an initial response URL.

::

  - * If the initial POST request is correct *, use the response URL to redirect the consumer to the payment page. The consumer fills out the required fields on the payment page and submits the payment. Continue with step 3.

  - * If the initial POST request is faulty *, WPP v2 returns an error code with a description of the problem in the response. **Return to step 1**.

3. **Parse and process the payment response:** The payment is processed. Depending on the result (successful, pending, failed or canceled), the consumer is redirected to the respective page. The WPP v2 sends a POST request containing base64 encoded payment data to the same URL. It is highly recommended that you parse and process this base64 encoded response to verify the payment.

**The payment process is complete.**

Payment-Processing Example
^^^^^^^^^^^^^^^^^^^^^^^^^^

This is an example of a credit card transaction to show how to process a payment with the Hosted Payment Page.

For more supported payment methods and payment-method-specific integration guides, go to `Payment Methods with WPP v2`_.

The payment-processing example is designed for the testing environment and does not use real information.

**Payment processing with the Bankograph Payment Page v2 generally follows the same steps:**

#. Create a payment session (initial request).

#. Redirect the consumer to the payment page (initial response URL).

#. Highly recommended: Parse and process the payment response.

We provide ready-made JSON samples for each step of this process. Use a tool such as Postman to test them.

**Setup and Test Credentials**


Before you can send your first request, use the following information to set up your testing tool:


.. list-table:: Test Credentials


    * - **URL (Endpoint)**
      - {rest-api-test-endpoint}

    * - **Merchant Account ID (MAID)**
      - 7a6dd74f-06ab-4f3f-a864-adc52687270a

    * - **Username**
      - 70000-APIDEMO-CARD

    * - **Password**
      - ohysS0-dvfMx

    * - **Secret Key (used for response verification)**
      - a8c3fce6-8df7-4fd6-a1fd-62fa229c5e55

    * - **Test Card**
      -

    * - **Card number**
      - 4200000000000018

    * - **Expiration date**
      - 01/23

    * - **CVV**
      - 018

#. **Create a Payment Session**

To create a payment session, send a POST request to the /api/payment/register endpoint, e.g. https://wpp-test.bankograph.com/api/payment/register.

This is an HTTP request with two headers:

  **Request Headers**
::

    Content-Type: application/json
    Authorization: Basic NzAwMDAtQVBJREVNTy1DQVJEOm9oeXNTMC1kdmZNeA==

The Authorization header needs to be formatted as: "Authorization"="Basic" + base64("username:password")

.. code-block:: json
    :caption: Code Blocks can have captions.

     {
       "payment": {
    "merchant-account-id": {
      "value": "7a6dd74f-06ab-4f3f-a864-adc52687270a"
    },
    "request-id": "{{$guid}}",
    "transaction-type": "authorization",
    "requested-amount": {
      "value": 10,
      "currency": "EUR"
    },
    "account-holder": {
      "first-name": "John",
      "last-name": "Doe"
    },
    "payment-methods": {
      "payment-method": [
        {
          "name": "creditcard"
        }
      ]
    },
    "success-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/success",
    "fail-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/error",
    "cancel-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/cancel"
    }
      }


.. list-table:: Field Table



    * - **Field (JSON)**
      - **Data Type**
      - **Required/Optional**
      - **Size**
      - **Description**

    * - merchant-account-id / value
      - String
      - Required
      - 36
      - A unique identifier assigned to every merchant account (by Bankograph).

    * - request-id
      - String
      - Required
      - 150
      - A unique identifier assigned to every request (by merchant). Used when searching for or referencing it later. {{$guid}} serves as a placeholder for a random request-id. Allowed characters:
         a - z
         0 - 9

    * - transaction-type
      - String
      - Required
      - 36
      - The requested transaction type.

    * - requested-amount /Value
      - Numeric
      - Required
      - 18
      - The full amount that is requested/contested in a transaction. 2 decimal places allowed. Use (decimal point) as the separator.

    * - requested-amount /currency
      - String
      - Required
      - 3
      - The currency of the requested/contested transaction amount. Format 3-character abbreviation according to ISO 4217.

    * - account holder / first-name
      - String
      - Optional
      - 32
      - The first name of the account holder.

    * - account holder / last-name
      - String
      - Required
      - 32
      - The last name of the account holder.

    * - payment-method / name
      - String
      - Optional
      - 15
      - The name of the payment method used. Set this value to creditcard.

    * - success-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after a successful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/success

    * - fail-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after a unsuccessful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/error

    * - cancel-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after having canceled a payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/cancel

.. Error::

   To create a payment session with Credit Card using 3D Secure 2 authentication, you need to include 3D Secure 2 fields in your initial request.
   Most of these fields are optional but we recommend the implementation of optional fields, as this creates a smoother user experience and ensures a higher level of security.
   Need more information on 3D Secure 2? Head to our general introduction to 3D Secure 2.

.. Hint::
  **Which Payment Methods Can I Choose?**

  Leave out the payment-methods object from the request. WPP v2 will show a grid of all available payment methods (based on your merchant configuration).

  Alternatively, check out Payment Methods with WPP v2 for an overview of all supported payment methods.

**Download the full integration demo from our GitHub**

.. image:: /_static/Available_on_Github_JAVA.png
   :target: https://github.com/wirecard/wpp-integration-demo-java


.. image:: /_static/Available_on_Github_PHP.png
   :target: https://github.com/wirecard/wpp-integration-demo-php



2. **Redirect the Consumer to the Payment Page**

The response to the initial authorization request contains the payment-redirect-url.

**Response to Authorization Request**

.. code-block::

 {
  "payment-redirect-url": "https://wpp-test.bankograph.com/?wPaymentToken=f0c0e5b3-23ad-4cb4-abca-ed80a0e770e7"
 }

 Use the payment-redirect-url to redirect the consumer.

 You can implement the redirection in any way that suits you best.

 **Redirecting Consumers to the Payment Page Using** WPP.hostedPayUrl

 You can use our ready-made function to handle the redirection:

 You can use our ready-made function to handle the redirection:

1. Add the paymentPage.js library to your checkout page HTML code

.. code-block::

  <script src="https://wpp-test.bankograph.com/loader/paymentPage.js" type="text/javascript"></script>

2. Submit the initial payment request on the backend.

3. Call the ``WPP.hostedPayUrl(payment-redirect-url)`` function in your HTML code to redirect the consumer to a new window:
.. code-block::

  <script type="text/javascript">
  WPP.hostedPayUrl("https://wpp-test.bankograph.com/?wPaymentToken=f0c0e5b3-23ad-4cb4-abca-ed80a0e770e7")
  </script>

 Make sure to pass the payment-redirect-url value from the initial response to the redirection function and call it.

.. Hint::
 The consumer is redirected to the payment form. There they enter their data and submit the form to confirm the payment. The response can

 - be successful (``transaction-state: success``)
 - fail (``transaction-state: failed``)
 - or the consumer canceled the payment before/after submission (``transaction-state: failed``).

 The transaction result is displayed as the value of ``transaction-state`` in the payment response. Canceled payments are returned as ``"transaction-state" : "failed"``, but the status description indicates it was canceled. More information (including the status code) can also be found in the payment response in the statuses object.

 In any case, a base64 encoded response containing payment information is sent to the corresponding redirection URL ``(success-redirect-url, cancel-redirect-url, or fail-redirect-url)``.

 See `Configuring Redirects and IPNs for WPP v2`_ for more information on redirection targets after payment.

3. **Parse and Process the Payment Response (Highly Recommended)**

``Where Can I Find the Payment Response?``

WPP v2 sends the final response to the success/fail page where the consumer is redirected to at the end of the payment session. This final response contains the payment data in a base64 encoded JSON format. It is sent with a POST request as form data ``response-base64``.

.. image:: /_static/Base64_v2_1.png

Before you are able to parse and process the payment response, you need to decode it.

**To test this**

- Copy and paste the ``payment-redirect-url`` into your browser.

- Open your browser’s console and complete the payment with the credit card information provided above.

- In your browser’s console, find the form data ``response-base64`` (see screenshot).

- Copy and paste the response into a base64 decoder of your choice, e.g. :PEP:`Base64 Decode`.

- Decode the response to view the payment response details.

You can find a decoded payment response example below.

**Parse and Process the Payment Response (Decoded Payment Response)**

.. code-block ::

 {
  "payment": {
    "transaction-type": "authorization",
    "transaction-id": "08649015-eb17-4c67-ab5f-d132af616e02",
    "completion-time-stamp": "2018-12-19T12:02:26",
    "card-token": {
      "token-id": "4242796444090018",
      "masked-account-number": "420000******0018"
    },
    "merchant-account-id": {
     "value": "7a6dd74f-06ab-4f3f-a864-adc52687270a"
    },
    "transaction-state": "success",
    "payment-methods": {
      "payment-method": [
        {
          "name": "creditcard"
        }
      ]
     },
    "cancel-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/cancel",
    "success-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/success",
    "fail-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/error",
    "api-id": "wpp"
   },
  "request-id": "28285dbd-ecd3-49bd-a7e5-0239affa2448",
  "requested-amount": {
    "currency": "EUR",
    "value": 10
   },
  "statuses": {
    "status": [
      {
        "description": "3d-acquirer:The resource was successfully created.",
        "severity": "information",
        "code": "201.0000"
      }
    ]
   },
  "authorization-code": "801433",
  "account-holder": {
    "first-name": "John",
    "last-name": "Doe"
   },
  "descriptor": "demo descriptor"
  }

.. list-table:: Field Table

      * - **Field (JSON)**
        - **Data Type**
        - **Description**

      * - transaction-type
        - String
        - The requested transaction type.

      * - transaction-id
        - String
        - A unique identifier to every transaction (by Bankograph). Used when searching for or referencing to it later.

      * - completion-time-stamp
        - YYYY-MM-DD-Thh:mm:ss
        - The UTC/ISO time-stamp documents the time & date when the transaction was executed. Format: YYYY-MM-DDThh:mm:ss (ISO).

      * - card token / token-id
        - String
        - A unique identifier assigned to every card token.

      * - card token / masked-account-number
        - String
        - This is the masked card account number of the consumer.

      * - merchant-account-id / value
        - String
        - A unique identifier assigned to every merchant account (by Bankograph).

      * - transaction-state
        - String
        - The current transaction state. Possible values:
           - ``in-progress``
           -  ``success``
           -  ``failed``

           Typically, a transaction starts with state ``in-progress`` and finishes with state either ``success`` or ``failed``. This information is returned in the response only.

      * - payment-mode / name
        - String
        - The name of the payment method used for the transaction.

      * - cancel-redirect-url
        - String
        - The URL to which the consumer is redirected after having canceled payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/cancel

      * - success-redirect-url
        - String
        - The URL to which the consumer is redirected after a successful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/success

      * - fail-redirect-url
        - String
        - The URL to which the consumer is redirected after a unsuccessful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/error

      * - api-id
        - String
        - Identifier of the currently used API.

      * - request-id
        - String
        - A unique identifier assigned to every request (by merchant). Used when searching for or referencing it later.

      * - requested-amount / currency
        - String
        - The currency of the requested/contested transaction amount.

      * - requested-amount / value
        - Numeric
        - The full amount that is requested/contested in a transaction.

      * - status / description
        - String
        - The description of the transaction status message.

      * - status / severity
        - String
        - The definition of the status message. Possible values:
           - ``information``
           -  ``warning``
           -  ``error``

      * - status / code
        - String
        - Status code of the status message.

      * - authorization-code
        - String
        - Output code for transaction type authorization.

      * - account-holder / first-name
        - String
        - The first name of the account holder.

      * - account-holder / last-name
        - String
        - The last name of the account holder.

      * - descriptor
        - String
        - Describes the transaction.


::

  For more information on redirect URLs, see Configuring Redirects and IPNs for WPP v2.
  For payment-method-specific requests, head over to the Payment Methods with WPP v2.


Merchants Integrated with NVP (HPP)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 **Migrating to WPP v2**

In addition to the new backend-to-backend JSON flow, WPP v2 supports an updated NVP flow for merchants who already integrated one of the Payment Page solutions previously and do not want to switch.

In that case, the migration to WPP v2 requires only a few minor changes. New features have an NVP field equivalent so you can use them in your integration. Check the WPP v2 Features section for specifics.

::

 Contact `merchant support`_ for your production credentials.


#. Find the ``paymentPageLoader`` JavaScript library in your ``<head>`` HTML code:

.. code-block::

  <script src="https://api-test.bankograph.com/engine/hpp/paymentPageLoader.js" type="text/javascript"></script>

Replace it with:

.. code-block::

 <script src="https://wpp-test.bankograph.com/loader/paymentPage.js" type="text/javascript"></script>

2. Find the ``hostedPay`` function call at the end of your Pay button function:

.. code-block::

   WirecardPaymentPage.hostedPay(requestData);

Replace it with:

.. code-block::

  WPP.hostedPay(requestData);

The fields in ``requestData`` remain the same and no changes are needed.


EPP Integration Guide
---------------------
*Download the full integration demo from our GitHub*
**Download the full integration demo from our GitHub**

.. image:: /_static/Available_on_Github_JAVA.png
   :target: https://github.com/wirecard/wpp-integration-demo-java


.. image:: /_static/Available_on_Github_PHP.png
   :target: https://github.com/wirecard/wpp-integration-demo-php

Overview
^^^^^^^^
To integrate the Embedded Payment Page (EPP) in your shop, use a simple backend-to-backend JSON workflow for the payment process.

1. **Create a payment session:** You send an initial POST request with details of the transaction to the Bankograph Payment Page v2 (WPP v2). This POST request is secured by basic access authentication.

2. **Render/create the payment page:** WPP v2 returns an initial response URL.

::

  - If the initial POST request is correct, use the response URL to render the embedded payment page as an overlay to the checkout page. The consumer fills out the required fields on the payment page and submits the payment. **Continue with step 3**.

  - If the initial POST request is faulty, WPP v2 returns an error code with a description of the problem in the response. **Return to step 1**.

3. **Parse and process the payment response:** The payment is processed. Depending on the result (successful, pending, failed or canceled), the consumer is redirected to the respective page. The WPP v2 sends a POST request containing base64 encoded payment data to the same URL. It is highly recommended that you parse and process this base64 encoded response to verify the payment.

   **The payment process is complete.**

Payment-Processing Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

   This is an example of a credit card transaction to show how to process a payment with the Embedded Payment Page.
   For more supported payment methods and payment-method-specific integration guides, go to `Payment Methods with WPP v2`_.

   The payment-processing example is **designed for the testing environment** and **does not use real information**.
::

   **Payment processing with the Bankograph Payment Page v2 generally follows the same steps:**

   1. Create a payment session (initial request).

   2. Render the embedded payment page.

   3. Highly recommended: Parse and process the payment response.

We provide ready-made JSON samples for each step of this process. Use a tool such as ``Postman`` to test them.

**Setup and Test Credentials**

Before you can send your first request, use the following information to set up your testing tool:

.. list-table:: Test Credentials

     * - **URL (Endpoint)**
       - https://wpp-test.bankograph.com/api/payment/register

     * - **Merchant Account ID (MAID)**
       - 7a6dd74f-06ab-4f3f-a864-adc52687270a

     * - **Username**
       - 70000-APIDEMO-CARD

     * - **Password**
       - ohysS0-dvfMx

     * - **Secret Key (used for response verification)**
       - a8c3fce6-8df7-4fd6-a1fd-62fa229c5e55

     * - **Test Card**
       -

     * - **Card number**
       - 4200000000000018

     * - **Expiration date**
       - 01/23

     * - **CVV**
       - 018

1. **Create a Payment Session**

To create a payment session, send a **POST request** to the ``/api/payment/register`` endpoint, e.g. ``https://wpp-test.bankograph.com/api/payment/register``.

This is an HTTP request with two headers:

  **Request Headers**
::

    Content-Type: application/json
    Authorization: Basic NzAwMDAtQVBJREVNTy1DQVJEOm9oeXNTMC1kdmZNeA==

The Authorization header needs to be formatted as: "Authorization"="Basic" + base64("username:password")

.. code-block:: json
    :caption: Code Blocks can have captions.

     {
       "payment": {
    "merchant-account-id": {
      "value": "7a6dd74f-06ab-4f3f-a864-adc52687270a"
    },
    "request-id": "{{$guid}}",
    "transaction-type": "authorization",
    "requested-amount": {
      "value": 10,
      "currency": "EUR"
    },
    "account-holder": {
      "first-name": "John",
      "last-name": "Doe"
    },
    "payment-methods": {
      "payment-method": [
        {
          "name": "creditcard"
        }
      ]
    },
    "success-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/success",
    "fail-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/error",
    "cancel-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/cancel"
    },
      "options": {
      "mode": "embedded",
      "frame-ancestor": "https://example.com"
        }
      }


.. list-table:: Field Table



    * - **Field (JSON)**
      - **Data Type**
      - **Required/Optional**
      - **Size**
      - **Description**

    * - merchant-account-id / value
      - String
      - Required
      - 36
      - A unique identifier assigned to every merchant account (by Bankograph).

    * - request-id
      - String
      - Required
      - 150
      - A unique identifier assigned to every request (by merchant). Used when searching for or referencing it later. {{$guid}} serves as a placeholder for a random request-id. Allowed characters:
         a - z
         0 - 9

    * - transaction-type
      - String
      - Required
      - 36
      - The requested transaction type.

    * - requested-amount /Value
      - Numeric
      - Required
      - 18
      - The full amount that is requested/contested in a transaction. 2 decimal places allowed. Use (decimal point) as the separator.

    * - requested-amount /currency
      - String
      - Required
      - 3
      - The currency of the requested/contested transaction amount. Format 3-character abbreviation according to ISO 4217.

    * - account holder / first-name
      - String
      - Optional
      - 32
      - The first name of the account holder.

    * - account holder / last-name
      - String
      - Required
      - 32
      - The last name of the account holder.

    * - payment-method / name
      - String
      - Optional
      - 15
      - The name of the payment method used. Set this value to creditcard.

    * - success-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after a successful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/success

    * - fail-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after a unsuccessful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/error

    * - cancel-redirect-url
      - String
      - Optional
      - 256
      - The URL to which the consumer is redirected after having canceled a payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/cancel

    * - options / mode
      - String
      - Required
      - 8
      - Indicates which mode of payment page is used for the payment. Currently supports ``seamless`` and ``embedded``.

    * - options / frame-ancestor
      - String
      - Required
      - 256
      - The URL of the checkout page where the iframe is rendered.

.. Error::

   To create a payment session with Credit Card using 3D Secure 2 authentication, you need to include 3D Secure 2 fields in your initial request.
   Most of these fields are optional but we recommend the implementation of optional fields, as this creates a smoother user experience and ensures a higher level of security.
   Need more information on 3D Secure 2? Head to our general introduction to 3D Secure 2.

.. Hint::
  **Which Payment Methods Can I Choose?**

  Leave out the payment-methods object from the request. WPP v2 will show a grid of all available payment methods (based on your merchant configuration).

  Alternatively, check out Payment Methods with WPP v2 for an overview of all supported payment methods.

**Download the full integration demo from our GitHub**

 .. image:: /_static/Available_on_Github_JAVA.png
   :target: https://github.com/wirecard/wpp-integration-demo-java


 .. image:: /_static/Available_on_Github_PHP.png
   :target: https://github.com/wirecard/wpp-integration-demo-php

2. **Embed the Payment Page**

The payment page is in this case an overlay window. It is created using the ``payment-redirect-url``, contained in the response to the initial authorization request.

**Response to Authorization Request**

 .. code-block::

    {
     "payment-redirect-url": "https://wpp-test.bankograph.com/?wPaymentToken=f0c0e5b3-23ad-4cb4-abca-ed80a0e770e7"
    }

**Embedding the Payment Page in your Checkout Page Using** ``WPP.embeddedPayUrl``

You can use our predefined function to embed the payment page:

1. Add the ``paymentPage.js`` library to your checkout page HTML code

.. code-block::

   <script src="https://wpp-test.bankograph.com/loader/paymentPage.js" type="text/javascript"></script>

   Make sure to pass the ``payment-redirect-url`` value from the initial response to the ``WPP.embeddedPayUrl`` function and call it to render the payment page.

2. Submit the **initial payment request** on the backend.

3. Call the ``WPP.hostedPayUrl(payment-redirect-url)`` function in your HTML code to render the new pop-up window.

.. code-block::

      <script type="text/javascript">WPP.embeddedPayUrl("https://wpp-test.bankograph.com/?wPaymentToken=f0c0e5b3-23ad-4cb4-abca-ed80a0e770e7")</script>

.. Hint::
    The consumer is redirected to the payment form. There they enter their data and submit the form to confirm the payment. The response can

    - be successful (``transaction-state: success``)
    - fail (``transaction-state: failed``)
    - or the consumer canceled the payment before/after submission (``transaction-state: failed``).

    The transaction result is displayed as the value of ``transaction-state`` in the payment response. Canceled payments are returned as ``"transaction-state" : "failed"``, but the status description indicates it was canceled. More information (including the status code) can also be found in the payment response in the statuses object.

    In any case, a base64 encoded response containing payment information is sent to the corresponding redirection URL ``(success-redirect-url, cancel-redirect-url, or fail-redirect-url)``.

    See `Configuring Redirects and IPNs for WPP v2`_ for more information on redirection targets after payment.

3. **Parse and Process the Payment Response (Highly Recommended)**

 ``Where Can I Find the Payment Response?``

  WPP v2 sends the final response to the success/fail page where the consumer is redirected to at the end of the payment session. This final response contains the payment data in a base64 encoded JSON format. It is sent with a POST request as form data ``response-base64``.

   .. image:: /_static/Base64_v2_1.png

Before you are able to parse and process the payment response, you need to decode it.

**To test this**

   - Copy and paste the ``payment-redirect-url`` into your browser.

   - Open your browser’s console and complete the payment with the credit card information provided above.

   - In your browser’s console, find the form data ``response-base64`` (see screenshot).

   - Copy and paste the response into a base64 decoder of your choice, e.g. :PEP:`Base64 Decode`.

   - Decode the response to view the payment response details.

 You can find a decoded payment response example below.

**Parse and Process the Payment Response (Decoded Payment Response)**

.. code-block ::

    {
     "payment": {
       "transaction-type": "authorization",
       "transaction-id": "08649015-eb17-4c67-ab5f-d132af616e02",
       "completion-time-stamp": "2018-12-19T12:02:26",
       "card-token": {
         "token-id": "4242796444090018",
         "masked-account-number": "420000******0018"
       },
       "merchant-account-id": {
        "value": "7a6dd74f-06ab-4f3f-a864-adc52687270a"
       },
       "transaction-state": "success",
       "payment-methods": {
         "payment-method": [
           {
             "name": "creditcard"
           }
         ]
        },
       "cancel-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/cancel",
       "success-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/success",
       "fail-redirect-url": "https://demoshop-test.bankograph.com/demoshop/#/error",
       "api-id": "wpp"
      },
     "request-id": "28285dbd-ecd3-49bd-a7e5-0239affa2448",
     "requested-amount": {
       "currency": "EUR",
       "value": 10
      },
     "statuses": {
       "status": [
         {
           "description": "3d-acquirer:The resource was successfully created.",
           "severity": "information",
           "code": "201.0000"
         }
       ]
      },
     "authorization-code": "801433",
     "account-holder": {
       "first-name": "John",
       "last-name": "Doe"
      },
     "descriptor": "demo descriptor"
     }

.. list-table:: Field Table

         * - **Field (JSON)**
           - **Data Type**
           - **Description**

         * - transaction-type
           - String
           - The requested transaction type.

         * - transaction-id
           - String
           - A unique identifier to every transaction (by Bankograph). Used when searching for or referencing to it later.

         * - completion-time-stamp
           - YYYY-MM-DD-Thh:mm:ss
           - The UTC/ISO time-stamp documents the time & date when the transaction was executed. Format: YYYY-MM-DDThh:mm:ss (ISO).

         * - card token / token-id
           - String
           - A unique identifier assigned to every card token.

         * - card token / masked-account-number
           - String
           - This is the masked card account number of the consumer.

         * - merchant-account-id / value
           - String
           - A unique identifier assigned to every merchant account (by Bankograph).

         * - transaction-state
           - String
           - The current transaction state. Possible values:
              - ``in-progress``
              -  ``success``
              -  ``failed``

              Typically, a transaction starts with state ``in-progress`` and finishes with state either ``success`` or ``failed``. This information is returned in the response only.

         * - payment-mode / name
           - String
           - The name of the payment method used for the transaction.

         * - cancel-redirect-url
           - String
           - The URL to which the consumer is redirected after having canceled payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/cancel

         * - success-redirect-url
           - String
           - The URL to which the consumer is redirected after a successful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/success

         * - fail-redirect-url
           - String
           - The URL to which the consumer is redirected after a unsuccessful payment, e.g. https://demoshop-test.bankograph.com/demoshop/#/error

         * - api-id
           - String
           - Identifier of the currently used API.

         * - request-id
           - String
           - A unique identifier assigned to every request (by merchant). Used when searching for or referencing it later.

         * - requested-amount / currency
           - String
           - The currency of the requested/contested transaction amount.

         * - requested-amount / value
           - Numeric
           - The full amount that is requested/contested in a transaction.

         * - status / description
           - String
           - The description of the transaction status message.

         * - status / severity
           - String
           - The definition of the status message. Possible values:
              - ``information``
              -  ``warning``
              -  ``error``

         * - status / code
           - String
           - Status code of the status message.

         * - authorization-code
           - String
           - Output code for transaction type authorization.

         * - account-holder / first-name
           - String
           - The first name of the account holder.

         * - account-holder / last-name
           - String
           - The last name of the account holder.

         * - descriptor
           - String
           - Describes the transaction.


::

     For more information on redirect URLs, see Configuring Redirects and IPNs for WPP v2.
     For payment-method-specific requests, head over to the Payment Methods with WPP v2.

Merchants Integrated with NVP (EPP)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
**Migrating to WPP v2**

In addition to the new backend-to-backend JSON flow, WPP v2 supports an updated NVP flow for merchants who already integrated one of the Payment Page solutions previously and do not want to switch.

In that case, the migration to WPP v2 requires only a few minor changes. New features have an NVP field equivalent so you can use them in your integration. Check the WPP v2 Features section for specifics.

::

  Contact merchant support for your production credentials.

1. Find the paymentPageLoader JavaScript library in your <head> HTML code:
 .. code-block::

    <script src="https://api-test.bankograph.com/engine/hpp/paymentPageLoader.js" type="text/javascript"></script>

 Replace it with:

.. code-block::

    <script src="https://wpp-test.bankograph.com/loader/paymentPage.js" type="text/javascript"></script>

2. Find the embeddedPay function call at the end of your Pay button function:

.. code-block::

    WirecardPaymentPage.embeddedPay(requestData);

Replace it with:

.. code-block::

     WPP.embeddedPay(requestData);

The fields in requestData remain the same and no changes are needed.

Seamless Integration Guide
--------------------------

*Download the full integration demo from our Github*

.. image:: /_static/Available_on_Github_JAVA.png
   :target: https://github.com/wirecard/wpp-integration-demo-java


.. image:: /_static/Available_on_Github_PHP.png
   :target: https://github.com/wirecard/wpp-integration-demo-php

Overview
^^^^^^^^

To integrate the Bankograph Payment Page v2 in Seamless Mode in your shop, get your checkout page ready in two steps:

1. **Preparing your checkout page**: Add the ``paymentPage.js`` library to your checkout page’s HTML code.

2. **Changing the background color setting in Payment Page Designer:** Set the background color to transparent in Payment Page Designer.

Then use a backend-to-backend JSON workflow for the payment process.

1. **Create a payment session:** You send an initial POST request with details of the transaction to the Bankograph Payment Page v2 (WPP v2). This POST request is secured by basic access authentication.

2. **Render the seamless payment form:** WPP v2 returns an initial response URL.

.. Hint::

   - If the initial POST request is correct, use this response URL and the WPP.seamlessRender library call to render the payment form in a seamless iframe. Continue with step 3.

   - If the initial POST request is faulty, WPP v2 returns an error code with a description of the problem in the response. Return to step 1.

3. **Submit the payment:** The consumer fills in the payment form. Use the WPP.seamlessSubmit function to submit the payment. Ensure that the function is bound to an interactive UI element, such as a button, in your HTML code.

  - **3D Secure credit card payment** automatically redirects the consumer to the authentication page, and then to a WPP v2 success- or fail-redirect-url. Include the success- and fail-redirect-urls in your initial request! This page includes a JSON sample for 3D Secure credit card payment.

  - **Non-3D Secure credit card payment** requires you to implement redirects to subsequent pages, such as a ``success-/fail-/cancel-redirect-url`` to let the consumer know about the payment outcome, by yourself.

4. **Parse and Process the Payment Response:** The payment is processed. WPP v2 returns base64 encoded payment data. It is highly recommended that you parse and process this base64 encoded response to verify the payment.
