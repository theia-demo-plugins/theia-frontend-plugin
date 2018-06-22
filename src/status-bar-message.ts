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
import {registerCommand, sleep} from './index';

export function initStatusBarCommands() {

    registerCommand({
        id: 'status_bar-message-command-timeout',
        label: 'Status Bar Message With Timeout 5s',
        callback: () => {
            theia.window.setStatusBarMessage('$(dashboard) test status bar message message timeout - 5s', 5000);
        }
    });

    registerCommand({
        id: 'status_bar-message-command-promise',
        label: 'Status Bar Message With Promise 5s',
        callback: () => {
            const promise = sleep(5000);
            theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise - 5s', promise);
        }
    });

    registerCommand({
        id: 'status_bar-message-command-disposable',
        label: 'Status Bar Message With Disposable 5s',
        callback: async () => {
            const disposable = theia.window.setStatusBarMessage('$(dashboard) test status bar message message promise - 5s');
            await sleep(5000);
            disposable.dispose();
        }
    });

    registerCommand({
        id: 'status_bar_item-command',
        label: 'Status Bar Item With Timeout 15',
        callback: async () => {
            const item = theia.window.createStatusBarItem(theia.StatusBarAlignment.Right, 99);
            item.text = 'Test Configure Excludes';
            item.tooltip = 'To enable project-wide ... language features, exclude large folders.';
            item.color = '#A5DF3B';
            item.show();
            await sleep(15000);
            item.dispose();
        }
    });
}
