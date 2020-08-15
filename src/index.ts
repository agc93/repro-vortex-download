import { log } from "vortex-api";
import { IExtensionContext, IExtensionApi } from 'vortex-api/lib/types/api';

//This is the main function Vortex will run when detecting the game extension. 
function main(context: IExtensionContext) {
    context.once(() => {
        log('debug', 'initialising your new extension!')
    });

    context.registerAction('global-icons', 200, 'dashboard', {}, 'Test Download',
        () => { 
            context.api.showDialog('question', 'Test Download Failures', {
                message: "These two download cases will both fail in different ways.\nCase #1 will successfully download, but be saved without it's file extension (verify by checking download folder).\nCase #2 will never successfully download.",
            }, [
                {label: "Case #1", action: () => runDownload(context.api, "https://beatmods.com/uploads/5f2739645baf5a5145fefaf4/universal/Custom Campaigns-2.6.2.zip")},
                {label: "Case #2", action: () => runDownload(context.api, "https://beatmods.com/uploads/5f274a875baf5a5145fefb05/universal/CustomCampaignLeaderboardLibrary-1.2.2.zip")},
                {label: "Cancel"}
            ]);
        });
    return true;
}

function runDownload(api: IExtensionApi, url: string) {
    api.events.emit('start-download', [url], {}, null, (err, id) => {
        if (err) {
            log('error', 'download failed', {err});
            api.showErrorNotification('download failed', err, {allowReport: false});
        } else {
            log('debug', 'download completed', {id});
        }
    });
}

module.exports = {
    default: main,
};