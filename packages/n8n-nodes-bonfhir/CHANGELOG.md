# @bonfhir/n8n-nodes-bonfhir

## 1.5.0

### Minor Changes

- [#337](https://github.com/bonfhir/bonfhir/pull/337) [`b4e78d0`](https://github.com/bonfhir/bonfhir/commit/b4e78d0209a3b5f3e32dc90553daa1e0e02a0d36) Thanks [@lp](https://github.com/lp)! - N8N Subscription Trigger Persistence

## 1.4.2

### Patch Changes

- [#277](https://github.com/bonfhir/bonfhir/pull/277) [`f58b99b`](https://github.com/bonfhir/bonfhir/commit/f58b99b87ce8d155409abc0ef5514e4a779cd435) Thanks [@github-actions](https://github.com/apps/github-actions)! - Bump

## 1.4.1

### Patch Changes

- [#278](https://github.com/bonfhir/bonfhir/pull/278) [`9267bff`](https://github.com/bonfhir/bonfhir/commit/9267bffc6281213882d27acb0e94c0ea61d67386) Thanks [@julienblin](https://github.com/julienblin)! - Update n8n-core dependency and adjusted types

## 1.4.0

### Minor Changes

- [#270](https://github.com/bonfhir/bonfhir/pull/270) [`55f9dac`](https://github.com/bonfhir/bonfhir/commit/55f9daccc8fa7753d1263233bae357a2d04d6bd5) Thanks [@julienblin](https://github.com/julienblin)! - Fix PATCH operation - now sending the proper `application/json-patch+json` content-type. This is a compatibility update for HAPI.

## 1.3.0

### Minor Changes

- [#262](https://github.com/bonfhir/bonfhir/pull/262) [`b9fd6f8`](https://github.com/bonfhir/bonfhir/commit/b9fd6f89220430c50e0d87b0a0046b9fed0cb2c5) Thanks [@julienblin](https://github.com/julienblin)! - Better error handling and management

- [#262](https://github.com/bonfhir/bonfhir/pull/262) [`d60edfb`](https://github.com/bonfhir/bonfhir/commit/d60edfb04de5fc3a7379fe0d3da25c1e31792007) Thanks [@julienblin](https://github.com/julienblin)! - Introduce trigger modes - webhook or resthook to handle different styles of servers, and have HAPI FHIR compatibility.

## 1.2.0

### Minor Changes

- [#255](https://github.com/bonfhir/bonfhir/pull/255) [`f4576b0`](https://github.com/bonfhir/bonfhir/commit/f4576b0866ace38289fe4c41ecaee20c69d8ad75) Thanks [@julienblin](https://github.com/julienblin)! - Search now inline included resources and filter on primary search

- [#255](https://github.com/bonfhir/bonfhir/pull/255) [`0243724`](https://github.com/bonfhir/bonfhir/commit/024372484ea61de7bc3616d615ffd97121b97291) Thanks [@julienblin](https://github.com/julienblin)! - Query parameters can now be specify using JSON or a collection

- [#255](https://github.com/bonfhir/bonfhir/pull/255) [`b1478b4`](https://github.com/bonfhir/bonfhir/commit/b1478b4d0face362fe5bdf127b0c6ed7a0c993ef) Thanks [@julienblin](https://github.com/julienblin)! - Add patch builder

### Patch Changes

- [#255](https://github.com/bonfhir/bonfhir/pull/255) [`9326974`](https://github.com/bonfhir/bonfhir/commit/9326974d90df075e63048116dbad1b8062dbf6ea) Thanks [@julienblin](https://github.com/julienblin)! - Add a Search One option

## 1.1.0

### Minor Changes

- [#252](https://github.com/bonfhir/bonfhir/pull/252) [`93d1586`](https://github.com/bonfhir/bonfhir/commit/93d158658632b49fc56f8367d2e2f8a348db991b) Thanks [@julienblin](https://github.com/julienblin)! - FHIRPath evaluation can emit multiple items

- [#252](https://github.com/bonfhir/bonfhir/pull/252) [`2f7e643`](https://github.com/bonfhir/bonfhir/commit/2f7e643cd7b80d1469e084a9f712a848d4b83b01) Thanks [@julienblin](https://github.com/julienblin)! - Fix #251 - Add a "Resolve FHIR references" operation

### Patch Changes

- [#252](https://github.com/bonfhir/bonfhir/pull/252) [`3823631`](https://github.com/bonfhir/bonfhir/commit/38236316dbda69dbcf87acacf6551fd39af10128) Thanks [@julienblin](https://github.com/julienblin)! - Fix #250 - n8n icon

## 1.0.0

### Major Changes

- [#248](https://github.com/bonfhir/bonfhir/pull/248) [`0e94b3a`](https://github.com/bonfhir/bonfhir/commit/0e94b3a57874e545867227b3584e95d4afe6c6a1) Thanks [@julienblin](https://github.com/julienblin)! - Initial version with Subscription and basic API operations
