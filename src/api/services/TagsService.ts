/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TagCreate } from '../models/TagCreate';
import type { TagOut } from '../models/TagOut';
import type { TagPatch } from '../models/TagPatch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagsService {
    /**
     * List
     * List tags
     * @returns TagOut Successful Response
     * @throws ApiError
     */
    public static listApiTagsListGet(): CancelablePromise<Array<TagOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tags/list',
        });
    }
    /**
     * Create
     * Create tag
     * @param requestBody
     * @returns TagOut Successful Response
     * @throws ApiError
     */
    public static createApiTagsCreatePost(
        requestBody: TagCreate,
    ): CancelablePromise<TagOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tags/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Patch
     * Edit tag
     * @param tagId
     * @param requestBody
     * @returns TagOut Successful Response
     * @throws ApiError
     */
    public static patchApiTagsPatchTagIdPatch(
        tagId: string,
        requestBody: TagPatch,
    ): CancelablePromise<TagOut> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/tags/patch/{tag_id}',
            path: {
                'tag_id': tagId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete
     * Delete tag
     * @param tagId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteApiTagsDeleteTagIdDelete(
        tagId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tags/delete/{tag_id}',
            path: {
                'tag_id': tagId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
