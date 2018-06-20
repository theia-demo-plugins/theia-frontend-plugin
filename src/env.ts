/*
 * Copyright (c) 2018-2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import * as theia from '@theia/plugin';
import { registerCommand } from './index';

export function initEnvCommands() {

    registerCommand({
        id: 'all-query-parameters-command',
        label: 'Show All Query Parameters',
        callback: () => {
            const parameters = JSON.stringify(theia.env.getQueryParameters());
            theia.window.showInformationMessage(parameters);
        }
    });

    registerCommand({
        id: 'test-query-parameter-command',
        label: 'Show Query Parameter \'test\'',
        callback: () => {
            const test = theia.env.getQueryParameter('test');
            theia.window.showInformationMessage(test === undefined ? 'undefined' : 'test=' + JSON.stringify(test));
        }
    });

    registerCommand({
        id: 'get-path-env-var-command',
        label: 'Show Env Variable \'PATH\'',
        callback: async () => {
            const value: string | undefined = await theia.env.getEnvVariable('PATH');
            theia.window.showInformationMessage(value === undefined ? 'undefined' : 'PATH=' + value, { modal: true });
        }
    });

    registerCommand({
        id: 'get-x-env-var-command',
        label: 'Show Env Variable \'X\'',
        callback: async () => {
            const value: string | undefined = await theia.env.getEnvVariable('X');
            theia.window.showInformationMessage(value === undefined ? 'undefined' : 'X=' + value, { modal: true });
        }
    });
}
