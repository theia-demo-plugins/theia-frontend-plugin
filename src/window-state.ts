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

import * as theia from '@wiptheia/plugin';
import { COMMAND_NAME_PREFIX, CONSOLE_OUTPUT_COMMAND_SUFIX, CONSOLE_OUTPUT_PREFIX } from './common/constants';

export function initWindowStateCommands(disposables: theia.Disposable[]) {
    const showStateCommand: theia.Command = {
        id: 'demo-show-window-state',
        label: COMMAND_NAME_PREFIX + 'Window State' + CONSOLE_OUTPUT_COMMAND_SUFIX
    };
    disposables.push(
        theia.commands.registerCommand(showStateCommand, (...args: any[]) => {
            console.log(CONSOLE_OUTPUT_PREFIX, 'Window state: ', theia.window.state);
        })
    );

    const showStateWithDelayCommand: theia.Command = {
        id: 'demo-show-window-state-delayed',
        label: COMMAND_NAME_PREFIX + 'Window State After 2.5 seconds' + CONSOLE_OUTPUT_COMMAND_SUFIX
    };
    disposables.push(
        theia.commands.registerCommand(showStateWithDelayCommand, (...args: any[]) => {
            setTimeout(() => console.log(CONSOLE_OUTPUT_PREFIX, 'Window state: ', theia.window.state), 2500);
        })
    );

    disposables.push(
        theia.window.onDidChangeWindowState((windowState: theia.WindowState) => {
            console.log(CONSOLE_OUTPUT_PREFIX, 'Window focus: ', windowState.focused);
        })
    );
}
