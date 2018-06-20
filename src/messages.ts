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
import { CONSOLE_OUTPUT_PREFIX } from './common/constants';
import { registerCommand } from './index';

export function initMessagesCommands() {

    registerCommand({
        id: 'information-message-command',
        label: 'information-message-command',
        callback: async () => {
            const action = await theia.window.showInformationMessage('Information message!');
            console.log(CONSOLE_OUTPUT_PREFIX, 'Close information message', 'Resolve', action);
        }
    });

    registerCommand({
        id: 'information-modal-message-command',
        label: 'Information Modal Message',
        callback: async () => {
            const action = await theia.window.showInformationMessage('Information modal message!', { modal: true },
                { title: 'action1' }, { title: 'action2', isCloseAffordance: true }, { title: 'action3' });
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        }
    });

    registerCommand({
        id: 'warning-message-command',
        label: 'Warning Message',
        callback: async () => {
            const action = await theia.window.showWarningMessage('Warning message!');
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        }
    });

    registerCommand({
        id: 'warning-modal-message-command',
        label: 'Warning Modal Message',
        callback: async () => {
            const action = await theia.window.showWarningMessage('Warning modal message!', { modal: true});
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        }
    });

    registerCommand({
        id: 'error-message-command',
        label: 'Error Message',
        callback: async () => {
            const action = await theia.window.showErrorMessage('Error message!');
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        }
    });

    registerCommand({
        id: 'error-modal-message-command',
        label: 'Error Modal Message',
        callback: async () => {
            const action = await theia.window.showErrorMessage('Error modal message!', { modal: true });
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        }
    });
}
