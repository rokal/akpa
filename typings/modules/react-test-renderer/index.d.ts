// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/9b5329839558a78550bf078c3e5f323c2f0f3b86/react-test-renderer/index.d.ts
declare module 'react-test-renderer' {
// Type definitions for react-test-renderer 15.4
// Project: https://facebook.github.io/react/
// Definitions by: Arvitaly <https://github.com/arvitaly>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

import { ReactElement } from 'react';

interface Renderer {
    toJSON(): ReactTestRendererJSON;
}
interface ReactTestRendererJSON {
    type: string;
    props: { [propName: string]: string };
    children: null | Array<string | ReactTestRendererJSON>;
    $$typeof?: any;
}
interface TestRendererOptions {
    createNodeMock: (element: ReactElement<any>) => any;
}
// https://github.com/facebook/react/blob/master/src/renderers/testing/ReactTestMount.js#L155
export function create(nextElement: ReactElement<any>, options?: TestRendererOptions): Renderer;
}
