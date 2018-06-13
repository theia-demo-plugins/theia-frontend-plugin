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
import { COMMAND_NAME_PREFIX, PLUGIN_NAME } from './common/constants';

export function initEnvCommands(disposables: theia.Disposable[]) {
    const showAllQueryParametersCommand = {
        id: PLUGIN_NAME + 'all-query-parameters-command',
        label: COMMAND_NAME_PREFIX + 'Show All Query Parameters'
    }
    disposables.push(theia.commands.registerCommand(showAllQueryParametersCommand, () => {
        theia.window.showInformationMessage(JSON.stringify(theia.env.getQueryParameters()));
    }));

    const getTestQueryParameterCommand = {
        id: PLUGIN_NAME + 'test-query-parameter-command',
        label: COMMAND_NAME_PREFIX + "Show Query Parameter 'test'"
    }
    disposables.push(theia.commands.registerCommand(getTestQueryParameterCommand, () => {
        const test = theia.env.getQueryParameter('test');
        theia.window.showInformationMessage(test === undefined ? 'undefined' : 'test=' + JSON.stringify(test));
    }));

    const getPathEnvVariableCommand = {
        id: PLUGIN_NAME + 'get-path-env-var-command',
        label: COMMAND_NAME_PREFIX + "Show Env Variable 'PATH'"
    }
    disposables.push(theia.commands.registerCommand(getPathEnvVariableCommand, () => {
        theia.env.getEnvVariable('PATH').then((value: string | undefined) => {
            theia.window.showInformationMessage(value === undefined ? 'undefined' : 'PATH=' + value, { modal: true });
        });
    }));

    const getXEnvVariableCommand = {
        id: PLUGIN_NAME + 'get-x-env-var-command',
        label: COMMAND_NAME_PREFIX + "Show Env Variable 'X'"
    }
    disposables.push(theia.commands.registerCommand(getXEnvVariableCommand, () => {
        theia.env.getEnvVariable('X').then((value: string | undefined) => {
            theia.window.showInformationMessage(value === undefined ? 'undefined' : 'X=' + value, { modal: true });
        });
    }));
}
