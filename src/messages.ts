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
import { COMMAND_NAME_PREFIX, CONSOLE_OUTPUT_PREFIX, PLUGIN_NAME } from './common/constants';

export function initMessagesCommands(disposables: theia.Disposable[]) {
    const informationMessageTestCommand = {
        id: PLUGIN_NAME + 'information-message-command',
        label: COMMAND_NAME_PREFIX + 'Information Message'
    };
    disposables.push(theia.commands.registerCommand(informationMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information message!');
    }));

    const informationModalMessageTestCommand = {
        id: PLUGIN_NAME + 'information-modal-message-command',
        label: COMMAND_NAME_PREFIX + 'Information Modal Message'
    };
    disposables.push(theia.commands.registerCommand(informationModalMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information modal message!', { modal: true },
            { title: 'action1' }, { title: 'action2', isCloseAffordance: true }, { title: 'action3' }).then(action => {
            console.log(CONSOLE_OUTPUT_PREFIX, 'Resolve', action);
        });
    }));

    const warningMessageTestCommand = {
        id: PLUGIN_NAME + 'warning-message-command',
        label: COMMAND_NAME_PREFIX + 'Warning Message'
    };
    disposables.push(theia.commands.registerCommand(warningMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning message!');
    }));

    const warningModalMessageTestCommand = {
        id: PLUGIN_NAME + 'warning-modal-message-command',
        label: COMMAND_NAME_PREFIX + 'Warning Modal Message'
    };
    disposables.push(theia.commands.registerCommand(warningModalMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning modal message!', { modal: true} );
    }));

    const errorMessageTestCommand = {
        id: PLUGIN_NAME + 'error-message-command',
        label: COMMAND_NAME_PREFIX + 'Error Message'
    };
    disposables.push(theia.commands.registerCommand(errorMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error message!');
    }));

    const errorModalMessageTestCommand = {
        id: PLUGIN_NAME + 'error-modal-message-command',
        label: COMMAND_NAME_PREFIX + 'Error Modal Message'
    };
    disposables.push(theia.commands.registerCommand(errorModalMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error modal message!', { modal: true });
    }));
}
