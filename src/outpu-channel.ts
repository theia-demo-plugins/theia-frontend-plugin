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
import { registerCommand, sleep } from './index';

export function initOutputChannelCommands() {

    registerCommand({
        id: 'output-channel-dispose-5s',
        label: 'Output Channel With Dispose - 5s',
        callback: async () => {
            const channelName = getChannelName('dispose');
            const outputChannel = theia.window.createOutputChannel(channelName);
            const testOutput = getTestOutput(20);
            outputChannel.append(testOutput);
            await sleep(5000);
            outputChannel.dispose();
        }
    });

    registerCommand({
        id: 'output-channel-clear-5s',
        label: 'Output Channel With Clear Output - 5s, Dispose - 15s',
        callback: async () => {
            const channelName = getChannelName('clear');
            const outputChannel = theia.window.createOutputChannel(channelName);
            const testOutput = getTestOutput(20);
            outputChannel.append(testOutput);
            await sleep(5000);
            outputChannel.clear();
            await sleep(15000);
            outputChannel.dispose();
        }
    });

    registerCommand({
        id: 'output-channelshow-delay-5s',
        label: 'Output Channel Show Delay - 5s, Dispose - 15s',
        callback: async () => {
            const channelName = getChannelName('delay');
            const outputChannel = theia.window.createOutputChannel(channelName);
            outputChannel.hide();
            const testOutput = getTestOutput(20);
            outputChannel.append(testOutput);
            await sleep(5000);
            outputChannel.show();
            await sleep(15000);
            outputChannel.dispose();
        }
    });
}

function getTestOutput(lineNumber?: number): string {
    const maxVal = lineNumber ? lineNumber : 10;

    let output = '';
    for (let counter = 1; counter <= maxVal; counter++) {
        output += `-${counter}-0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz\r`;
    }
    return output;
}

function getChannelName(pre?: string): string {
    return `${pre ? pre : 'channel'}-${('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)}`;
}
