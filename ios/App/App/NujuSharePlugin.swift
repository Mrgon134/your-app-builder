import UIKit
import Capacitor

@objc(NujuSharePlugin)
public class NujuSharePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NujuSharePlugin"
    public let jsName = "NujuShare"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "canOpen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "shareInstagramStory", returnType: CAPPluginReturnPromise)
    ]

    @objc func canOpen(_ call: CAPPluginCall) {
        guard let target = call.getString("target") else {
            call.reject("Missing target", "MISSING_TARGET")
            return
        }

        guard let url = schemeURL(for: target) else {
            call.resolve(["value": false])
            return
        }

        DispatchQueue.main.async {
            call.resolve(["value": UIApplication.shared.canOpenURL(url)])
        }
    }

    @objc func shareInstagramStory(_ call: CAPPluginCall) {
        let appId = call.getString("facebookAppId") ??
            Bundle.main.object(forInfoDictionaryKey: "FacebookAppID") as? String ??
            ""

        guard !appId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            call.reject("Instagram Stories sharing requires a Facebook App ID.", "MISSING_FACEBOOK_APP_ID")
            return
        }

        guard let imageBase64 = call.getString("imageBase64"),
              let imageData = dataFromBase64(imageBase64) else {
            call.reject("Missing or invalid image data.", "INVALID_IMAGE")
            return
        }

        guard let urlScheme = URL(string: "instagram-stories://share?source_application=\(appId)") else {
            call.reject("Invalid Instagram URL scheme.", "INVALID_URL")
            return
        }

        DispatchQueue.main.async {
            guard UIApplication.shared.canOpenURL(urlScheme) else {
                call.reject("Instagram is not available.", "APP_NOT_AVAILABLE")
                return
            }

            var pasteboardItem: [String: Any] = [
                "com.instagram.sharedSticker.backgroundImage": imageData
            ]

            if let contentUrl = call.getString("contentUrl"), !contentUrl.isEmpty {
                pasteboardItem["com.instagram.sharedSticker.contentURL"] = contentUrl
            }

            let options: [UIPasteboard.OptionsKey: Any] = [
                .expirationDate: Date().addingTimeInterval(60 * 5)
            ]

            UIPasteboard.general.setItems([pasteboardItem], options: options)
            UIApplication.shared.open(urlScheme, options: [:]) { completed in
                if completed {
                    call.resolve(["completed": true])
                } else {
                    call.reject("Instagram did not open.", "OPEN_FAILED")
                }
            }
        }
    }

    private func schemeURL(for target: String) -> URL? {
        switch target {
        case "instagram_story":
            return URL(string: "instagram-stories://share")
        case "instagram_reels":
            return URL(string: "instagram://")
        case "tiktok":
            return URL(string: "tiktok://")
        case "whatsapp_status":
            return URL(string: "whatsapp://")
        default:
            return nil
        }
    }

    private func dataFromBase64(_ value: String) -> Data? {
        if let commaIndex = value.firstIndex(of: ",") {
            return Data(base64Encoded: String(value[value.index(after: commaIndex)...]))
        }
        return Data(base64Encoded: value)
    }
}
