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

// interface ExtendedTextOptions extends theia.TextEditorOptions {
//     fontSize?: string | undefined
// }

export function initConfigurationCommands() {
    registerCommand({
        id: "get-default-workspace-configuration-command",
        label: "Get default workspace configuration",
        callback: () => {
            const wsConfig = theia.workspace.getConfiguration(); // implement return default configurations values 
            // const editorOps: ExtendedTextOptions = wsConfig.get<ExtendedTextOptions>('editor') || {};
            // console.log("Editor Line numbers:", editorOps.lineNumbers);
            // console.log("Editor font size:", editorOps.fontSize);

            const editorOp2s = wsConfig.get('editor.lineNumbers') || "can't find";
            console.log("Editor Line numbers:", editorOp2s);

            // inspect didn't implemented.
            // wsConfig.inspect<string>("editor.fontSize");
            // console.log("font size", fontSize);
        }
    });

    registerCommand({
        id: "get-line-numbers-activation-state",
        label: "Get editor line numbers activation state",
        callback: () => {
            const wsConfig = theia.workspace.getConfiguration('editor'); // implement return default configurations values 
            // const editorOps: ExtendedTextOptions = wsConfig.get<ExtendedTextOptions>('editor') || {};
            // console.log("Editor Line numbers:", editorOps.lineNumbers);
            // console.log("Editor font size:", editorOps.fontSize);

            console.log('>>> wsConfig: ', wsConfig);
            const lineNumbers = wsConfig.get("lineNumbers") || "can't find";
            console.log("Editor Line numbers:", lineNumbers);
        }
    });
}