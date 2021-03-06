/* generated by Svelte vX.Y.Z */
import { addListener, assign, callAll, createElement, detachNode, init, insertNode, proto, removeListener, timeRangesToArray } from "svelte/shared.js";

function create_main_fragment(component, state) {
	var audio, audio_is_paused = true, audio_updating = false, audio_animationframe;

	function audio_timeupdate_handler() {
		cancelAnimationFrame(audio_animationframe);
		if (!audio.paused) audio_animationframe = requestAnimationFrame(audio_timeupdate_handler);
		audio_updating = true;
		component.set({ played: timeRangesToArray(audio.played), currentTime: audio.currentTime });
		audio_updating = false;
	}

	function audio_durationchange_handler() {
		component.set({ duration: audio.duration });
	}

	function audio_play_pause_handler() {
		audio_updating = true;
		component.set({ paused: audio.paused });
		audio_updating = false;
	}

	function audio_progress_handler() {
		component.set({ buffered: timeRangesToArray(audio.buffered) });
	}

	function audio_loadedmetadata_handler() {
		component.set({ buffered: timeRangesToArray(audio.buffered), seekable: timeRangesToArray(audio.seekable) });
	}

	function audio_volumechange_handler() {
		audio_updating = true;
		component.set({ volume: audio.volume });
		audio_updating = false;
	}

	return {
		c: function create() {
			audio = createElement("audio");
			this.h();
		},

		h: function hydrate() {
			addListener(audio, "timeupdate", audio_timeupdate_handler);
			if (!('played' in state && 'currentTime' in state)) component.root._beforecreate.push(audio_timeupdate_handler);
			addListener(audio, "durationchange", audio_durationchange_handler);
			if (!('duration' in state)) component.root._beforecreate.push(audio_durationchange_handler);
			addListener(audio, "play", audio_play_pause_handler);
			addListener(audio, "pause", audio_play_pause_handler);
			addListener(audio, "progress", audio_progress_handler);
			if (!('buffered' in state)) component.root._beforecreate.push(audio_progress_handler);
			addListener(audio, "loadedmetadata", audio_loadedmetadata_handler);
			if (!('buffered' in state && 'seekable' in state)) component.root._beforecreate.push(audio_loadedmetadata_handler);
			addListener(audio, "volumechange", audio_volumechange_handler);
		},

		m: function mount(target, anchor) {
			insertNode(audio, target, anchor);

			audio.volume = state.volume;
		},

		p: function update(changed, state) {
			if (!audio_updating && !isNaN(state.currentTime )) audio.currentTime = state.currentTime ;
			if (!audio_updating && audio_is_paused !== (audio_is_paused = state.paused )) audio[audio_is_paused ? "pause" : "play"]();
			if (!audio_updating && !isNaN(state.volume)) audio.volume = state.volume;
		},

		u: function unmount() {
			detachNode(audio);
		},

		d: function destroy() {
			removeListener(audio, "timeupdate", audio_timeupdate_handler);
			removeListener(audio, "durationchange", audio_durationchange_handler);
			removeListener(audio, "play", audio_play_pause_handler);
			removeListener(audio, "pause", audio_play_pause_handler);
			removeListener(audio, "progress", audio_progress_handler);
			removeListener(audio, "loadedmetadata", audio_loadedmetadata_handler);
			removeListener(audio, "volumechange", audio_volumechange_handler);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		callAll(this._beforecreate);
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;