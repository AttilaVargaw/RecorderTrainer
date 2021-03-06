import i18n from "i18n-js";
import {memoize} from "lodash";
import { I18nManager, Platform } from "react-native";

import RNFS from "react-native-fs";
import * as RNLocalize from "react-native-localize";

export const setI18nConfig = async () => {
  const translationsDir = await (Platform.OS === "android"
    ? RNFS.readDirAssets("translations")
    : Platform.OS === "macos"
    ? RNFS.readDir(RNFS.MainBundlePath + "/Contents/Resources/translations")
    : RNFS.readDir(RNFS.MainBundlePath + "/translations"));

  const translationPaths: {[key: string]: string} = translationsDir
    .filter(({ isFile, name }) => isFile() && name.endsWith(".json"))
    .reduce((all, { name, path }) => {
      const languageTag = name.replace(".json", "");
      return { ...all, [languageTag]: path };
    }, {});

  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationPaths)) ||
    fallback;

  const fileContent = await (Platform.OS === "android"
    ? RNFS.readFileAssets(translationPaths[languageTag], "utf8")
    : RNFS.readFile(translationPaths[languageTag], "utf8"));

  // clear translation cache
  translate.cache.clear!();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  i18n.translations = { [languageTag]: JSON.parse(fileContent) };
  i18n.locale = languageTag;
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);