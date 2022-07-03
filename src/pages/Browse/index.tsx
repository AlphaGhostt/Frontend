import { Box, Grid, Skeleton, Toolbar } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Helmet } from '../../components/DHelmet';
import DItemCard from '../../components/DItemCard';
import { SearchIconWrapper, SearchInputBase, SearchWrapper } from '../../components/DSearchStyles';
import DSelect from '../../components/DSelect';
import { APP_DESCRIPTION, APP_NAME } from '../../config';
import { get } from '../../utilities/requests';
import { MainContainer } from './styles';

interface BrowseParams {
    query: string;
    genre: string;
    year: number;
    sort: string;
    category: number;
    page: number;
    limit: number;
    mediaType: 'movies' | 'series';
}

const handleDebouncedSearch = debounce(
    async (queryParams, setData, setRequestInfo, setIsLoaded) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await get(`/browse${queryParams}`, setData, setRequestInfo, setIsLoaded);
    },
    1500,
);

const BrowsePage = () => {
    const tempParams: BrowseParams = {
        query: '',
        genre: '',
        year: 0,
        sort: 'title:1',
        category: -1,
        page: 0,
        limit: 20,
        mediaType: 'movies',
    };

    const [data, setData] = useState<any>([]);
    const [params, setParams] = useState<BrowseParams>(tempParams);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [requestInfo, setRequestInfo] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const location: any = useLocation();
    useEffect(() => {
        const wanted_keys = [
            'query',
            'genre',
            'year',
            'sort',
            'category',
            'page',
            'limit',
            'mediaType',
        ];
        if (location.state) {
            console.log(location.state);
            for (let i = 0; i < wanted_keys.length; i++) {
                if (location.state[wanted_keys[i]]) {
                    params[wanted_keys[i]] = location.state[wanted_keys[i]];
                }
            }
            setParams(params);
        }
        handleSearch();
    }, [location.state]);

    const handleSearch = () => {
        setIsLoaded(false);
        const queryParams = `?query=${encodeURIComponent(params.query)}&genre=${encodeURIComponent(
            params.genre,
        )}&year=${params.year}&sort=${encodeURIComponent(params.sort)}&category=${
            params.category
        }&media_type=${encodeURIComponent(params.mediaType)}&page=${params.page}&limit=${
            params.limit
        }`;
        handleDebouncedSearch(
            `/${params.category}/${params.page}${queryParams}`,
            setData,
            setRequestInfo,
            setIsLoaded,
        );
    };

    const handleChangeQuery = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.query = '';
        } else {
            newParams.query = event.target.value || '';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeGenre = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.genre = '';
        } else {
            newParams.genre = event.target.value || '';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeYear = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.year = 0;
        } else {
            newParams.year = event.target.value || 0;
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeSort = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.sort = 'title:1';
        } else {
            newParams.sort = (event.target.value || 'title').toLowerCase() + ':1';
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeCategory = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.category = -1;
        } else {
            newParams.category = event.target.value || -1;
        }
        setParams(newParams);
        handleSearch();
    };

    const handleChangeMediaType = (event: any) => {
        var newParams = params;
        if (event.target.value === 'Any') {
            newParams.mediaType = 'movies';
        } else {
            newParams.mediaType = (event.target.value || 'movies').toLowerCase();
        }
        setParams(newParams);
        handleSearch();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChangePage = (event: any) => {
        var newParams = params;
        newParams.page = event.target.value || 0;
        setParams(newParams);
        handleSearch();
    };

    const genres = [
        'Any',
        'Action',
        'Adventure',
        'Action & Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Kids',
        'Music',
        'Mystery',
        'News',
        'Reality',
        'Romance',
        'Science Fiction',
        'Sci-Fi & Fantasy',
        'Soap',
        'Talk',
        'Thriller',
        'TV Movie',
        'War',
        'War & Politics',
        'Western',
    ];

    const range = (start, stop) => Array.from({ length: stop - start + 1 }, (_, i) => start + i);
    const years = range(1920, new Date().getFullYear()).reverse();
    years.unshift('Any');

    const sortings = ['Title', 'Popularity', 'Rating', 'Release Date', 'Size', 'Runtime'];

    return (
        <MainContainer>
            <Toolbar />
            <Helmet>
                <title>{APP_NAME}</title>
                <meta name='description' content={APP_DESCRIPTION} />
            </Helmet>
            <Box sx={{ marginTop: '20px' }}>
                <Box>
                    <Grid
                        container
                        sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                    >
                        <Grid item sm={10}>
                            <SearchWrapper fullWidth standalone>
                                <SearchIconWrapper>
                                    <i className='ri-search-2-line'></i>
                                </SearchIconWrapper>
                                <SearchInputBase
                                    fullWidth
                                    placeholder='Search…'
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleChangeQuery}
                                />
                            </SearchWrapper>
                        </Grid>
                    </Grid>
                    <Grid
                        spacing={4}
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '0px',
                            padding: '5px',
                        }}
                    >
                        <Grid item sm={2}>
                            <DSelect
                                title='Genre'
                                currentOption='Any'
                                options={genres}
                                onChange={handleChangeGenre}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Year'
                                currentOption='Any'
                                options={years}
                                onChange={handleChangeYear}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Type'
                                currentOption='Any'
                                options={['Any', 'Movies', 'Series']}
                                onChange={handleChangeMediaType}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Category'
                                currentOption='Any'
                                options={['Any']}
                                onChange={handleChangeCategory}
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <DSelect
                                title='Sort'
                                currentOption='Title'
                                options={sortings}
                                onChange={handleChangeSort}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px',
                        alignItems: 'center',
                        width: '85%',
                        margin: 'auto',
                    }}
                    spacing={2}
                >
                    {isLoaded
                        ? data.length > 0 &&
                          data.map((item) => (
                              <Grid item xs={6} sm={2} key={item.tmdb_id}>
                                  <DItemCard
                                      item={item}
                                      type={item.number_of_files ? 'movie' : 'series'}
                                  />
                              </Grid>
                          ))
                        : [...Array(params.limit)].map((_, item) => (
                              <Grid item xs={6} sm={2} key={item}>
                                  <Skeleton
                                      variant='rectangular'
                                      animation='wave'
                                      sx={{
                                          aspectRatio: '1/1.33',
                                          width: '100%',
                                          height: '100%',
                                          borderRadius: '10px',
                                      }}
                                  />
                              </Grid>
                          ))}
                </Grid>
            </Box>
        </MainContainer>
    );
};

export default BrowsePage;
