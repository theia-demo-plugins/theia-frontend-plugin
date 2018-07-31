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
            // todo generic should work too...
            // const editorOps: ExtendedTextOptions = wsConfig.get<ExtendedTextOptions>('editor') || {};
            // console.log("Editor Line numbers:", editorOps.lineNumbers);
            // console.log("Editor font size:", editorOps.fontSize);

            const editorOp2s = wsConfig.get('editor.lineNumbers') || "can't find";
            console.log("Editor Line numbers:", editorOp2s);
        }
    });

    registerCommand({
        id: "get-plugin-configuration-property",
        label: "Get plugin configuration property",
        callback: () => {
            const wsConfig = theia.workspace.getConfiguration();
            console.log("?????????????????????????????????", wsConfig);
            const someProperty = wsConfig.get('test.someProperty');
            console.log("Property from plugin:", someProperty);
        }
    });

    // inspect didn't implemented.
    // wsConfig.inspect<string>("editor.fontSize");
    // console.log("font size", fontSize);

    registerCommand({
        id: "get-editor-auto-save-conf",
        label: "Get editor autoSave from default config",
        callback: () => {
            const wsConfig = theia.workspace.getConfiguration('editor'); // implement return default configurations values 
            // const editorOps: ExtendedTextOptions = wsConfig.get<ExtendedTextOptions>('editor') || {};
            // console.log("Editor Line numbers:", editorOps.lineNumbers);
            // console.log("Editor font size:", editorOps.fontSize);

            console.log('>>> wsConfig: ', wsConfig);
            const autoSave = wsConfig.get("autoSave") || "can't find";
            console.log("Editor AutoSave is:", autoSave);

            // const wsConfig2 = theia.workspace.getConfiguration('editor.lineNumbers'); //
            // console.log("Editor Line numbers2:", wsConfig2.get("lineNumbers"));
        }
    });

    registerCommand({
        id: "add-on-did-change-configuration-listener",
        label: "Add on did change configuration listener",
        callback: () => {
            // return dispossible...
            theia.workspace.onDidChangeConfiguration(event => {
                const confEditorIsAffected = event.affectsConfiguration("editor");
                console.log(">>>>>>>>>>>>>>Configuration editor is affected? " + confEditorIsAffected);
                const confFileIsAffected = event.affectsConfiguration("file");
                console.log(">>>>>>>>>>>>>>Configuration file is affected? " + confFileIsAffected); // todo notify
            });
        }
    });

    registerCommand({
        id: "update-conf",
        label: "Update configuration field",
        callback: () => {
            const wsConfig = theia.workspace.getConfiguration(); 
            const currentValue = wsConfig.get('test.lineNumbers');
            console.log("current value of test.lineNumbers ", currentValue);
            const updateValue = currentValue === "on" ? "off" : "on";
            console.log("Update test.lineNumbers to the value ", updateValue);

            wsConfig.update("test.lineNumbers", updateValue, theia.ConfigurationTarget.Workspace).then(() => {
                // setTimeout(() => {
                    const newerConfig = theia.workspace.getConfiguration(); 
                    console.log("Updated test Line numbers:", newerConfig.get("test.lineNumbers"));
                // }, 5000);
            });
        }
    });
}