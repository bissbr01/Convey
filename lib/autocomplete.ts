import { Trie, TrieNode } from '@datastructures-js/trie';

class Autocomplete {
  dictionary;
  constructor() {
    this.dictionary = new Trie();
  }

  loadWords(words: string[]) {
    for (let i = 0; i < words.length; i++) {
      this.dictionary.insert(words[i]);
    }
  }
}
